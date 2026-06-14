import { createElement, useMemo, useState } from "react";
import { Input, Switch } from "@arvia-ui/react";
import { Controls as controlStyles } from "../site.arv";
import { CodeBlock } from "./CodeBlock";
import type { PlaygroundConfig, PropDefinition } from "../docs/components/types";

type ControlKind = "select" | "boolean" | "number" | "text";
type Control = { name: string; kind: ControlKind; options?: string[] };

/** Infer an interactive control from a prop's type string. Returns null for props
 *  that can't (or shouldn't) be controlled: functions, spreads, refs, element types,
 *  and the uncontrolled `default*` mirrors of a value/checked prop. */
function inferControl(prop: PropDefinition): Control | null {
  const { name, type } = prop;
  if (name.startsWith("...") || name.startsWith("default")) return null;
  if (/HTMLAttributes|ElementType|ReactElement|=>/.test(type)) return null;
  if (type === "boolean") return { name, kind: "boolean" };
  if (type === "number") return { name, kind: "number" };
  const literals = [...type.matchAll(/"([^"]+)"/g)].map((m) => m[1] ?? "");
  if (literals.length > 0) return { name, kind: "select", options: literals };
  return { name, kind: "text" };
}

function defaultFor(prop: PropDefinition, kind: ControlKind): unknown {
  if (prop.default !== undefined) {
    const raw = prop.default.replace(/^["']|["']$/g, "");
    if (kind === "boolean") return raw === "true";
    if (kind === "number") return Number(raw);
    return raw;
  }
  return kind === "boolean" ? false : undefined;
}

function generateCode(
  name: string,
  controls: Control[],
  args: Record<string, unknown>,
  defaults: Record<string, unknown>,
): string {
  const attrs: string[] = [];
  let children = "";
  for (const control of controls) {
    const value = args[control.name];
    if (control.name === "children") {
      children = value == null ? "" : String(value);
      continue;
    }
    // Only show props that differ from their default — keeps the snippet to the point.
    if (value === undefined || value === "" || value === false) continue;
    if (value === defaults[control.name]) continue;
    if (control.kind === "boolean") attrs.push(control.name);
    else if (control.kind === "number") attrs.push(`${control.name}={${value as number}}`);
    else attrs.push(`${control.name}="${value as string}"`);
  }
  const attrStr = attrs.length ? " " + attrs.join(" ") : "";
  return children ? `<${name}${attrStr}>${children}</${name}>` : `<${name}${attrStr} />`;
}

export function Controls(props: {
  importName: string;
  propDefs: PropDefinition[];
  playground: PlaygroundConfig;
}) {
  const styles = controlStyles();
  const { playground } = props;

  const controls = useMemo(() => {
    const defs = playground.controls
      ? props.propDefs.filter((p) => playground.controls?.includes(p.name))
      : props.propDefs;
    return defs.map(inferControl).filter((c): c is Control => c !== null);
  }, [props.propDefs, playground.controls]);

  const [args, setArgs] = useState<Record<string, unknown>>(() => {
    const seeded: Record<string, unknown> = {};
    for (const control of controls) {
      const def = props.propDefs.find((p) => p.name === control.name);
      seeded[control.name] = def ? defaultFor(def, control.kind) : undefined;
    }
    return { ...seeded, ...playground.args };
  });

  const set = (name: string, value: unknown) => setArgs((prev) => ({ ...prev, [name]: value }));

  const rendered = playground.render
    ? playground.render(args)
    : playground.Component
      ? createElement(playground.Component, args)
      : null;

  const defaults = useMemo(() => {
    const map: Record<string, unknown> = {};
    for (const control of controls) {
      const def = props.propDefs.find((p) => p.name === control.name);
      map[control.name] = def ? defaultFor(def, control.kind) : undefined;
    }
    return map;
  }, [controls, props.propDefs]);

  const code = useMemo(
    () => generateCode(props.importName, controls, args, defaults),
    [props.importName, controls, args, defaults],
  );

  return (
    <>
      <div className={styles.root}>
        <div className={styles.preview}>{rendered}</div>
        <div className={styles.panel}>
          {controls.map((control) => (
            <div key={control.name} className={styles.row}>
              <span className={styles.name}>{control.name}</span>
              <div className={styles.control}>
                {control.kind === "select" && control.options ? (
                  <div className={styles.segmented} role="group">
                    {control.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={styles.segment}
                        data-active={String(args[control.name]) === option || undefined}
                        onClick={() => set(control.name, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : control.kind === "boolean" ? (
                  <Switch
                    checked={Boolean(args[control.name])}
                    onChange={(value) => set(control.name, value)}
                  />
                ) : control.kind === "number" ? (
                  <Input
                    type="number"
                    value={args[control.name] == null ? "" : String(args[control.name])}
                    onChange={(event) =>
                      set(
                        control.name,
                        event.target.value === "" ? undefined : Number(event.target.value),
                      )
                    }
                    style={{ maxWidth: 120 }}
                  />
                ) : (
                  <Input
                    value={args[control.name] == null ? "" : String(args[control.name])}
                    onChange={(event) => set(control.name, event.target.value)}
                    style={{ maxWidth: 260 }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CodeBlock lang="tsx">{code}</CodeBlock>
    </>
  );
}
