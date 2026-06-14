import { DocHeader } from "../../components/DocsShell";
import { TokenReference } from "../../components/TokenReference";
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
        Theming is <strong>pure native CSS — there is no JavaScript runtime to ship</strong>. Arvia
        compiles mode-aware color tokens to a single{" "}
        <DocCode>light-dark(lightValue, darkValue)</DocCode> declaration on <DocCode>:root</DocCode>
        , and sets <DocCode>color-scheme</DocCode> to drive it. Native UA widgets — scrollbars, form
        controls, focus rings — follow the active scheme too.
      </DocP>
      <DocP>
        With no further setup the theme follows the OS: <DocCode>:root</DocCode> declares{" "}
        <DocCode>color-scheme: light dark</DocCode>, so <DocCode>light-dark()</DocCode> resolves to
        the user&apos;s system preference automatically.
      </DocP>
      <DocP>
        To pin or toggle the mode, set <DocCode>data-arvia-theme</DocCode> on{" "}
        <DocCode>&lt;html&gt;</DocCode> — it flips <DocCode>color-scheme</DocCode>, which flips
        every <DocCode>light-dark()</DocCode> color:
      </DocP>
      <DocPre>{`<html data-arvia-theme="dark">`}</DocPre>
      <DocH2>Switching at runtime</DocH2>
      <DocP>
        There is no library helper — set the attribute yourself. It is one native DOM call:
      </DocP>
      <DocPre>{`function setTheme(mode /* "light" | "dark" */) {
  document.documentElement.setAttribute("data-arvia-theme", mode);
}`}</DocPre>
      <DocP>
        To persist a choice without a flash of the wrong theme, apply it before first paint with a
        tiny inline script in your HTML <DocCode>&lt;head&gt;</DocCode>:
      </DocP>
      <DocPre lang="html">{`<script>
  try {
    var t = localStorage.getItem("theme");
    if (t) document.documentElement.setAttribute("data-arvia-theme", t);
  } catch (e) {}
</script>`}</DocPre>
      <DocP>This site does exactly that — try the theme toggle in the nav bar.</DocP>
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
        Reassign variables on <DocCode>:root</DocCode> to rebrand the entire app. Wrap mode-varying
        colors in <DocCode>light-dark()</DocCode> so a single declaration stays correct in both
        modes — including OS-driven dark, where no attribute is set:
      </DocP>
      <DocPre lang="css">{`/* brand.css — import after @arvia-ui/react */
:root {
  --arvia-color-primary: light-dark(#4f46e5, #635bff);
  --arvia-color-primaryHover: light-dark(#4338ca, #5249e6);
  --arvia-color-primarySubtle: light-dark(#eef2ff, #1e1b4b);
  --arvia-color-focus: light-dark(#4f46e5, #635bff);
}`}</DocPre>
      <DocP>
        For a color that should be the same in both modes, just assign it plainly — no{" "}
        <DocCode>light-dark()</DocCode> needed. This docs site uses the same pattern in{" "}
        <DocCode>site-theme.css</DocCode> to remap the default teal palette to indigo/zinc.
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
        The attribute sets <DocCode>color-scheme</DocCode> on whatever element carries it — not just{" "}
        <DocCode>&lt;html&gt;</DocCode>. Because <DocCode>color-scheme</DocCode> and{" "}
        <DocCode>light-dark()</DocCode> inherit, a dark app can contain a light island (and vice
        versa) with no extra CSS:
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
      <DocH2>Things to know</DocH2>
      <DocUl>
        <DocLi>
          Setting <DocCode>data-arvia-theme</DocCode> flips <DocCode>color-scheme</DocCode>, which
          switches every <DocCode>light-dark()</DocCode> color and themes native UA widgets — no
          JavaScript from the library is involved
        </DocLi>
        <DocLi>
          Global dark-only overrides can target <DocCode>:root[data-arvia-theme="dark"]</DocCode>,
          but prefer a single <DocCode>light-dark()</DocCode> declaration so it also covers
          OS-driven dark
        </DocLi>
        <DocLi>
          Scoped sections with their own <DocCode>data-arvia-theme</DocCode> are independent of the
          global mode
        </DocLi>
        <DocLi>
          With no attribute set anywhere, the OS preference drives everything via{" "}
          <DocCode>color-scheme: light dark</DocCode> on <DocCode>:root</DocCode>
        </DocLi>
        <DocLi>
          <DocCode>light-dark()</DocCode> and <DocCode>color-scheme</DocCode> are Baseline 2024
          (Chrome&nbsp;123+, Safari&nbsp;17.5+, Firefox&nbsp;120+)
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
        Every token from <DocCode>theme.arv</DocCode> maps to a CSS variable you can override. Click{" "}
        <strong>Copy</strong> on any row to grab the variable name for your stylesheet.
      </DocP>
      <TokenReference />
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
