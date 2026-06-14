import { memo, useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { TokenReference as tokenRefStyles } from "../site.arv";
import {
  COLOR_TOKENS,
  DURATION_TOKENS,
  EASING_TOKENS,
  FONT_TOKENS,
  RADIUS_TOKENS,
  SHADOW_TOKENS,
  SPACE_TOKENS,
  cssVar,
  type ColorTokenDef,
  type SimpleTokenDef,
} from "../docs/tokens/token-data";
import "./token-reference.css";

type Category = "color" | "space" | "radius" | "font" | "shadow" | "duration" | "easing";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "color", label: "Color" },
  { id: "space", label: "Space" },
  { id: "radius", label: "Radius" },
  { id: "font", label: "Font" },
  { id: "shadow", label: "Shadow" },
  { id: "duration", label: "Duration" },
  { id: "easing", label: "Easing" },
];

const CATEGORY_NOTES: Partial<Record<Category, string>> = {
  color:
    "Default package palette (teal & stone). Mode-varying tokens compile to light-dark() on :root.",
  shadow: "Shadow values differ in dark mode for stronger elevation on dark surfaces.",
};

function CopyButton(props: { text: string; className: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const resetTimerRef = useRef<number | undefined>(undefined);

  const copy = useCallback(async () => {
    const button = buttonRef.current;
    if (!button) return;

    try {
      await navigator.clipboard.writeText(props.text);
      window.clearTimeout(resetTimerRef.current);
      button.textContent = "Copied";
      button.dataset.copied = "true";
      resetTimerRef.current = window.setTimeout(() => {
        button.textContent = "Copy";
        button.dataset.copied = "false";
      }, 1200);
    } catch {
      /* clipboard unavailable */
    }
  }, [props.text]);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={props.className}
      data-copied="false"
      onClick={() => void copy()}
      title={`Copy ${props.text}`}
    >
      Copy
    </button>
  );
}

const TokenStage = memo(function TokenStage(props: { className: string; children: ReactNode }) {
  return (
    <div className={props.className} data-arvia-token-stage>
      {props.children}
    </div>
  );
});

function TokenRow(props: {
  styles: ReturnType<typeof tokenRefStyles>;
  name: string;
  variable: string;
  value: string;
  description?: string;
  stage: ReactNode;
}) {
  const s = props.styles;

  return (
    <article className={s.item} data-arvia-token-item>
      <TokenStage className={s.stage}>{props.stage}</TokenStage>
      <div className={s.meta}>
        <div className={s.head}>
          <span className={s.name}>{props.name}</span>
          <CopyButton text={props.variable} className={s.copyBtn} />
        </div>
        <code className={s.varCode}>{props.variable}</code>
        <code className={s.valueCode}>{props.value}</code>
        {props.description ? <p className={s.desc}>{props.description}</p> : null}
      </div>
    </article>
  );
}

function formatColorValue(token: ColorTokenDef): string {
  if (token.light === token.dark) return token.light;
  return `light: ${token.light}\ndark:  ${token.dark}`;
}

function ColorStage(props: { styles: ReturnType<typeof tokenRefStyles>; token: ColorTokenDef }) {
  const s = props.styles;
  const hasDarkVariant = props.token.light !== props.token.dark;

  if (!hasDarkVariant) {
    return (
      <div
        className={s.colorDemo}
        style={{ background: props.token.light }}
        title={props.token.light}
      />
    );
  }

  return (
    <div className={s.colorPair}>
      <div className={s.colorPairItem}>
        <div
          className={s.colorDemo}
          style={{ background: props.token.light }}
          title={props.token.light}
        />
        <span className={s.colorLabel}>Light</span>
      </div>
      <div className={s.colorPairItem}>
        <div
          className={s.colorDemo}
          style={{ background: props.token.dark }}
          title={props.token.dark}
        />
        <span className={s.colorLabel}>Dark</span>
      </div>
    </div>
  );
}

function ColorsView(props: { styles: ReturnType<typeof tokenRefStyles> }) {
  const s = props.styles;

  return (
    <div className={s.list}>
      {COLOR_TOKENS.map((token) => (
        <TokenRow
          key={token.name}
          styles={s}
          name={`color.${token.name}`}
          variable={cssVar("color", token.name)}
          value={formatColorValue(token)}
          description={token.description}
          stage={<ColorStage styles={s} token={token} />}
        />
      ))}
    </div>
  );
}

function SpaceView(props: { styles: ReturnType<typeof tokenRefStyles> }) {
  const s = props.styles;

  return (
    <div className={s.list}>
      {SPACE_TOKENS.map((token) => (
        <TokenRow
          key={token.name}
          styles={s}
          name={`space.${token.name}`}
          variable={cssVar("space", token.name)}
          value={token.value}
          stage={
            <div className={s.spacingDemo} style={{ gap: token.value }}>
              <div className={s.spacingBlock} />
              <div className={s.spacingBlock} />
            </div>
          }
        />
      ))}
    </div>
  );
}

function RadiusView(props: { styles: ReturnType<typeof tokenRefStyles> }) {
  const s = props.styles;

  return (
    <div className={s.list}>
      {RADIUS_TOKENS.map((token) => (
        <TokenRow
          key={token.name}
          styles={s}
          name={`radius.${token.name}`}
          variable={cssVar("radius", token.name)}
          value={token.value}
          stage={<div className={s.radiusDemo} style={{ borderRadius: token.value }} />}
        />
      ))}
    </div>
  );
}

function FontView(props: { styles: ReturnType<typeof tokenRefStyles> }) {
  const s = props.styles;

  return (
    <div className={s.list}>
      {FONT_TOKENS.map((token) => (
        <TokenRow
          key={token.name}
          styles={s}
          name={`font.${token.name}`}
          variable={cssVar("font", token.name)}
          value={token.value}
          stage={
            <div className={s.typeWrap}>
              <p className={s.typeSample} style={{ fontSize: token.value }}>
                Aa
              </p>
              <p className={s.typeSentence} style={{ fontSize: token.value }}>
                The quick brown fox
              </p>
            </div>
          }
        />
      ))}
    </div>
  );
}

function ShadowView(props: { styles: ReturnType<typeof tokenRefStyles> }) {
  const s = props.styles;

  return (
    <div className={s.list}>
      {SHADOW_TOKENS.map((token) => (
        <TokenRow
          key={token.name}
          styles={s}
          name={`shadow.${token.name}`}
          variable={cssVar("shadow", token.name)}
          value={`light: ${token.light}\ndark:  ${token.dark}`}
          stage={
            <div className={s.shadowPair}>
              <div className={s.colorPairItem}>
                <div className={s.shadowDemo} style={{ boxShadow: token.light }} />
                <span className={s.colorLabel}>Light</span>
              </div>
              <div className={s.colorPairItem}>
                <div
                  className={s.shadowDemo}
                  style={{
                    boxShadow: token.dark,
                    background: "#1c1917",
                    borderColor: "#292524",
                  }}
                />
                <span className={s.colorLabel}>Dark</span>
              </div>
            </div>
          }
        />
      ))}
    </div>
  );
}

const MotionStage = memo(function MotionStage(props: {
  styles: ReturnType<typeof tokenRefStyles>;
  token: SimpleTokenDef;
}) {
  const s = props.styles;

  return (
    <div className={`${s.motionEase} arvia-token-motion-ease`} data-easing={props.token.name}>
      <div className={s.motionEaseTrack} />
      <div className={`${s.motionEaseDot} arvia-token-motion-dot`} />
    </div>
  );
});

function DurationView(props: { styles: ReturnType<typeof tokenRefStyles> }) {
  const s = props.styles;

  return (
    <div className={s.durationGrid}>
      {DURATION_TOKENS.map((token) => (
        <article key={token.name} className={s.durationCard}>
          <div className={s.durationHead}>
            <div className={s.durationInfo}>
              <span className={s.name}>duration.{token.name}</span>
              <code className={s.varCode}>{cssVar("duration", token.name)}</code>
              <code className={s.valueCode}>{token.value}</code>
            </div>
            <CopyButton text={cssVar("duration", token.name)} className={s.copyBtn} />
          </div>
          <div className={s.durationTrack} aria-hidden="true">
            <span
              className={`${s.durationFill} arvia-token-duration-fill`}
              data-duration={token.name}
            />
          </div>
        </article>
      ))}
    </div>
  );
}

function EasingView(props: { styles: ReturnType<typeof tokenRefStyles> }) {
  const s = props.styles;

  return (
    <div className={s.list}>
      {EASING_TOKENS.map((token) => (
        <TokenRow
          key={token.name}
          styles={s}
          name={`easing.${token.name}`}
          variable={cssVar("easing", token.name)}
          value={token.value}
          stage={<MotionStage styles={s} token={token} />}
        />
      ))}
    </div>
  );
}

function CategoryView(props: { category: Category; styles: ReturnType<typeof tokenRefStyles> }) {
  switch (props.category) {
    case "color":
      return <ColorsView styles={props.styles} />;
    case "space":
      return <SpaceView styles={props.styles} />;
    case "radius":
      return <RadiusView styles={props.styles} />;
    case "font":
      return <FontView styles={props.styles} />;
    case "shadow":
      return <ShadowView styles={props.styles} />;
    case "duration":
      return <DurationView styles={props.styles} />;
    case "easing":
      return <EasingView styles={props.styles} />;
  }
}

export function TokenReference() {
  const s = tokenRefStyles();
  const [active, setActive] = useState<Category>("color");
  const note = useMemo(() => CATEGORY_NOTES[active], [active]);

  return (
    <div className={s.root}>
      <nav className={s.tabs} aria-label="Token categories">
        <div className={s.tabsList} role="tablist">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              className={s.tab}
              data-active={active === category.id ? "true" : undefined}
              aria-selected={active === category.id}
              onClick={() => setActive(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </nav>

      <div className={s.body}>
        {note ? <p className={s.note}>{note}</p> : null}
        <CategoryView category={active} styles={s} />
      </div>
    </div>
  );
}
