import { DocHeader } from "../../components/DocsShell";
import {
  DocCode,
  DocH2,
  DocH3,
  DocP,
  DocPre,
  DocProse,
  DocUl,
  DocLi,
} from "../../components/DocProse";
import type { DocPageMeta } from "../registry";

export const themingMeta: DocPageMeta = {
  slug: "theming",
  title: "Theming",
  description:
    "Light and dark modes, semantic tokens, CSS variable overrides, and switching themes at runtime.",
};

export function ThemingPage() {
  return (
    <DocProse>
      <DocHeader {...themingMeta} />
      <DocP>
        arvia-ui ships with a warm teal and stone palette defined in{" "}
        <DocCode>@arvia-ui/core-styles</DocCode>. The theme supports <strong>light</strong> and{" "}
        <strong>dark</strong> modes out of the box.
      </DocP>
      <DocH2>How modes work</DocH2>
      <DocP>
        Arvia compiles mode-aware tokens to CSS variables. Set <DocCode>data-arvia-theme</DocCode>{" "}
        on <DocCode>&lt;html&gt;</DocCode> to pick the active mode:
      </DocP>
      <DocPre>{`<html data-arvia-theme="dark">`}</DocPre>
      <DocP>
        If you do not set the attribute, the OS <DocCode>prefers-color-scheme: dark</DocCode> media
        query applies dark defaults on <DocCode>:root</DocCode> automatically.
      </DocP>
      <DocH2>setTheme helper</DocH2>
      <DocP>
        <DocCode>@arvia-ui/react</DocCode> exports <DocCode>setTheme(mode)</DocCode> which updates
        the attribute on <DocCode>&lt;html&gt;</DocCode> for you:
      </DocP>
      <DocPre>{`import { setTheme } from "@arvia-ui/react";

setTheme("dark");
setTheme("light");`}</DocPre>
      <DocP>This site uses the same helper — try the theme toggle in the nav bar.</DocP>
      <DocH2>Semantic tokens</DocH2>
      <DocUl>
        <DocLi>
          <DocCode>color.primary</DocCode> — brand actions and emphasis
        </DocLi>
        <DocLi>
          <DocCode>color.text</DocCode> / <DocCode>color.muted</DocCode> /{" "}
          <DocCode>color.subtle</DocCode> — typography hierarchy
        </DocLi>
        <DocLi>
          <DocCode>color.surface</DocCode> / <DocCode>color.background</DocCode> — layered surfaces
        </DocLi>
        <DocLi>
          <DocCode>space.*</DocCode>, <DocCode>radius.*</DocCode>, <DocCode>font.*</DocCode>,{" "}
          <DocCode>shadow.*</DocCode> — layout and rhythm
        </DocLi>
      </DocUl>
      <DocH2>Overriding tokens with CSS variables</DocH2>
      <DocP>
        Arvia compiles every token to a CSS custom property. Component styles reference{" "}
        <DocCode>var(--arvia-*)</DocCode>, so you can override the theme by reassigning those
        variables — no Vite plugin or library API required.
      </DocP>
      <DocP>
        Naming convention: <DocCode>color.primary</DocCode> becomes{" "}
        <DocCode>--arvia-color-primary</DocCode>. Import your override stylesheet{" "}
        <strong>after</strong> <DocCode>@arvia-ui/react</DocCode> so your values win (component
        imports pull in the bundled CSS automatically via <DocCode>sideEffects</DocCode>).
      </DocP>
      <DocPre>{`// main.tsx
import { Button } from "@arvia-ui/react";
import "./brand.css"; // last — overrides bundled tokens`}</DocPre>
      <DocH2>Global brand overrides</DocH2>
      <DocP>
        Set variables on <DocCode>:root</DocCode> to rebrand the entire app. Target{" "}
        <DocCode>:root[data-arvia-theme="dark"]</DocCode> when using <DocCode>setTheme</DocCode> so
        dark-mode overrides apply when the user switches modes:
      </DocP>
      <DocPre lang="css">{`/* brand.css — import after @arvia-ui/react */
:root {
  --arvia-color-primary: #4f46e5;
  --arvia-color-primaryHover: #4338ca;
  --arvia-color-primarySubtle: #eef2ff;
  --arvia-color-focus: #4f46e5;
}

:root[data-arvia-theme="dark"] {
  --arvia-color-primary: #635bff;
  --arvia-color-primaryHover: #5249e6;
  --arvia-color-primarySubtle: #1e1b4b;
  --arvia-color-focus: #635bff;
}`}</DocPre>
      <DocP>
        This docs site uses the same pattern in <DocCode>site-theme.css</DocCode> to remap the
        default teal palette to indigo/zinc.
      </DocP>
      <DocH2>Scoped overrides</DocH2>
      <DocP>
        CSS custom properties inherit. Set variables on any wrapper to affect only its descendants —
        useful for a marketing section, embedded widget, or preview pane with a different brand.
      </DocP>
      <DocH3>Brand only (inherits parent mode)</DocH3>
      <DocPre lang="css">{`.marketing {
  --arvia-color-primary: #e11d48;
  --arvia-color-primaryHover: #be123c;
  --arvia-color-focus: #e11d48;
}`}</DocPre>
      <DocH3>Independent light/dark island</DocH3>
      <DocP>
        Compiled selectors <DocCode>[data-arvia-theme="light"]</DocCode> and{" "}
        <DocCode>[data-arvia-theme="dark"]</DocCode> match <strong>any element</strong>, not just{" "}
        <DocCode>&lt;html&gt;</DocCode>. A dark app can contain a light island (and vice versa):
      </DocP>
      <DocPre>{`<div data-arvia-theme="light" class="preview-pane">
  <Button tone="primary">Always light tokens</Button>
</div>`}</DocPre>
      <DocP>
        Combine <DocCode>data-arvia-theme</DocCode> with custom variables for brand and mode:
      </DocP>
      <DocPre lang="css">{`.brand-section[data-arvia-theme="dark"] {
  --arvia-color-primary: #635bff;
  --arvia-color-primaryHover: #5249e6;
}`}</DocPre>
      <DocH2>Interaction with setTheme</DocH2>
      <DocUl>
        <DocLi>
          <DocCode>setTheme("dark")</DocCode> sets <DocCode>data-arvia-theme</DocCode> on{" "}
          <DocCode>&lt;html&gt;</DocCode> — global dark overrides should target{" "}
          <DocCode>:root[data-arvia-theme="dark"]</DocCode>
        </DocLi>
        <DocLi>
          Scoped sections with their own <DocCode>data-arvia-theme</DocCode> are independent of the
          global mode set by <DocCode>setTheme</DocCode>
        </DocLi>
        <DocLi>
          Without <DocCode>setTheme</DocCode>, rely on <DocCode>:root</DocCode> overrides for light
          and let the OS dark preference apply the bundled dark defaults, or add a{" "}
          <DocCode>@media (prefers-color-scheme: dark)</DocCode> block in your override stylesheet
        </DocLi>
      </DocUl>
      <DocH2>Using tokens in custom CSS</DocH2>
      <DocP>
        Non-arvia-ui elements can reference the same variables. Use{" "}
        <DocCode>var(--arvia-color-primary)</DocCode>, <DocCode>var(--arvia-space-4)</DocCode>, etc.
        in your own stylesheets to stay aligned with the active theme.
      </DocP>
      <DocPre lang="css">{`.hero-accent {
  background: color-mix(in srgb, var(--arvia-color-accent) 12%, transparent);
  padding: var(--arvia-space-6);
  border-radius: var(--arvia-radius-lg);
}`}</DocPre>
      <DocH2>Token reference</DocH2>
      <DocP>
        Every token from <DocCode>theme.arv</DocCode> maps to a CSS variable you can override. Copy
        any name into your override stylesheet:
      </DocP>
      <DocH3>color</DocH3>
      <DocPre lang="css">{`--arvia-color-primary
--arvia-color-primaryHover
--arvia-color-primarySubtle
--arvia-color-accent
--arvia-color-danger
--arvia-color-dangerHover
--arvia-color-dangerSubtle
--arvia-color-success
--arvia-color-successSubtle
--arvia-color-warning
--arvia-color-warningSubtle
--arvia-color-text
--arvia-color-muted
--arvia-color-subtle
--arvia-color-surface
--arvia-color-surfaceRaised
--arvia-color-background
--arvia-color-border
--arvia-color-borderStrong
--arvia-color-focus`}</DocPre>
      <DocP>
        In the default theme, <DocCode>accent</DocCode>, <DocCode>danger</DocCode>,{" "}
        <DocCode>success</DocCode>, and <DocCode>warning</DocCode> base hues are the same in light
        and dark. Tokens with distinct <DocCode>@dark</DocCode> values include{" "}
        <DocCode>primary</DocCode>, <DocCode>text</DocCode>, <DocCode>surface</DocCode>,{" "}
        <DocCode>background</DocCode>, <DocCode>border</DocCode>, and <DocCode>shadow</DocCode>.
      </DocP>
      <DocH3>space</DocH3>
      <DocPre lang="css">{`--arvia-space-1   /*  4px */
--arvia-space-2   /*  8px */
--arvia-space-3   /* 12px */
--arvia-space-4   /* 16px */
--arvia-space-5   /* 20px */
--arvia-space-6   /* 24px */
--arvia-space-7   /* 32px */
--arvia-space-8   /* 40px */
--arvia-space-9   /* 48px */`}</DocPre>
      <DocH3>radius</DocH3>
      <DocPre lang="css">{`--arvia-radius-sm
--arvia-radius-md
--arvia-radius-lg
--arvia-radius-xl
--arvia-radius-full`}</DocPre>
      <DocH3>font</DocH3>
      <DocPre lang="css">{`--arvia-font-xs
--arvia-font-sm
--arvia-font-md
--arvia-font-lg
--arvia-font-xl
--arvia-font-2xl
--arvia-font-3xl
--arvia-font-4xl`}</DocPre>
      <DocH3>shadow</DocH3>
      <DocPre lang="css">{`--arvia-shadow-sm
--arvia-shadow-md
--arvia-shadow-lg`}</DocPre>
      <DocP>Shadow values differ in dark mode.</DocP>
      <DocH3>duration and easing</DocH3>
      <DocPre lang="css">{`--arvia-duration-fast
--arvia-duration-normal
--arvia-duration-slow
--arvia-easing-default
--arvia-easing-out`}</DocPre>
      <DocH2>Custom themes (compile-time)</DocH2>
      <DocP>
        To author your own <DocCode>.arv</DocCode> components or fork token <em>definitions</em> at
        build time, copy <DocCode>theme.arv</DocCode> from <DocCode>@arvia-ui/core-styles</DocCode>{" "}
        and pass it to the <DocCode>@arviahq/vite-plugin-react</DocCode>. Component{" "}
        <DocCode>.arv</DocCode> files reference tokens — swap the theme, keep the components. This
        is for design-system authors; CSS variable overrides are the recommended path for app-level
        branding.
      </DocP>
    </DocProse>
  );
}
