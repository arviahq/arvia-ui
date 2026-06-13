import { DocHeader } from "../../components/DocsShell";
import { DocH2, DocP, DocPre, DocProse, DocUl, DocLi } from "../../components/DocProse";
import type { DocPageMeta } from "../registry";

export const themingMeta: DocPageMeta = {
  slug: "theming",
  title: "Theming",
  description: "Light and dark modes, semantic tokens, and switching themes at runtime.",
};

export function ThemingPage() {
  return (
    <DocProse>
      <DocHeader {...themingMeta} />
      <DocP>
        arvia-ui ships with a warm teal and stone palette defined in <code>@arviahq/ui-styles</code>
        . The theme supports <strong>light</strong> and <strong>dark</strong> modes out of the box.
      </DocP>
      <DocH2>How modes work</DocH2>
      <DocP>
        Arvia compiles mode-aware tokens to CSS variables. Set <code>data-arvia-theme</code> on{" "}
        <code>&lt;html&gt;</code> to pick the active mode:
      </DocP>
      <DocPre>{`<html data-arvia-theme="dark">`}</DocPre>
      <DocH2>setTheme helper</DocH2>
      <DocP>
        <code>@arviahq/ui-react</code> exports <code>setTheme(mode)</code> which updates the
        attribute for you:
      </DocP>
      <DocPre>{`import { setTheme } from "@arviahq/ui-react";

setTheme("dark");
setTheme("light");`}</DocPre>
      <DocP>This site uses the same helper — try the theme toggle in the nav bar.</DocP>
      <DocH2>Semantic tokens</DocH2>
      <DocUl>
        <DocLi>
          <strong>color.primary</strong> — brand actions and emphasis
        </DocLi>
        <DocLi>
          <strong>color.text / muted / subtle</strong> — typography hierarchy
        </DocLi>
        <DocLi>
          <strong>color.surface / background</strong> — layered surfaces
        </DocLi>
        <DocLi>
          <strong>space.*, radius.*, font.*, shadow.*</strong> — layout and rhythm
        </DocLi>
      </DocUl>
      <DocH2>Custom themes</DocH2>
      <DocP>
        Fork <code>theme.arv</code> from <code>@arviahq/ui-styles</code> or extend tokens in your
        own theme file passed to the Vite plugin. Component <code>.arv</code> files reference tokens
        — swap the theme, keep the components.
      </DocP>
    </DocProse>
  );
}
