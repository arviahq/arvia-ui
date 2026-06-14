import { PropsTable as propsTableStyles } from "../site.arv";
import type { PropDefinition } from "../docs/components/types";

function parseTypeValues(type: string): string[] {
  const quoted = [...type.matchAll(/"([^"]+)"/g)].map((match) => match[1]!);
  if (quoted.length > 0) return quoted;

  const trimmed = type.trim();
  if (/^boolean(\s*\|\s*undefined)?$/i.test(trimmed)) return ["boolean"];
  if (trimmed === "ReactNode") return ["ReactNode"];
  if (trimmed === "number") return ["number"];
  if (trimmed === "string") return ["string"];

  return [trimmed];
}

function displayValue(value: string): string {
  return value.replace(/^["']|["']$/g, "");
}

export function PropsTable(props: { rows: PropDefinition[] }) {
  const table = propsTableStyles();

  return (
    <section className={table.root}>
      <header className={table.header}>
        <h2 className={table.title}>Props</h2>
        <span className={table.count}>{props.rows.length}</span>
      </header>

      <div className={table.list}>
        {props.rows.map((row) => {
          const typeValues = parseTypeValues(row.type);
          const required = row.default === undefined;

          return (
            <div key={row.name} className={table.row}>
              <div className={table.main}>
                <div className={table.nameRow}>
                  <span className={table.propName}>{row.name}</span>
                  <span className={table.badge} data-required={required ? "true" : "false"}>
                    {required ? "REQUIRED" : "OPTIONAL"}
                  </span>
                </div>

                <div className={table.pills}>
                  {typeValues.map((value) => (
                    <span key={value} className={table.tag}>
                      {displayValue(value)}
                    </span>
                  ))}
                </div>

                {row.description ? <p className={table.desc}>{row.description}</p> : null}
              </div>

              <div className={table.defaultCol}>
                <span className={table.defaultLabel}>DEFAULT</span>
                {row.default ? (
                  <span className={table.tag}>{displayValue(row.default)}</span>
                ) : (
                  <span className={table.defaultEmpty}>—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
