import { DocHeader } from "../../components/DocsShell";
import { DocH2, DocP, DocProse, DocUl, DocLi } from "../../components/DocProse";
import type { DocPageMeta } from "../registry";

export const introductionMeta: DocPageMeta = {
  slug: "introduction",
  title: "Introduction",
  description: "What arvia-ui is, how it relates to Arvia, and why the architecture is split across packages.",
};

export function IntroductionPage() {
  return (
    <DocProse>
      <DocHeader {...introductionMeta} />
      <DocP>
        arvia-ui is a collection of beautiful, crafted UI components built on{" "}
        <a href="https://github.com/arviahq/arvia">Arvia</a>. Styles live in shared{" "}
        <code>.arv</code> files; each framework package adds thin wrappers for semantics, accessibility, and
        composition.
      </DocP>
      <DocH2>Two packages, one design system</DocH2>
      <DocUl>
        <DocLi>
          <strong>@arviahq/ui-styles</strong> — theme tokens, recipes, and component style definitions
        </DocLi>
        <DocLi>
          <strong>@arviahq/ui-react</strong> — React 18+ components that map props to Arvia class names
        </DocLi>
      </DocUl>
      <DocP>
        Future framework targets follow the same pattern: <code>@arviahq/ui-vue</code>,{" "}
        <code>@arviahq/ui-preact</code>, each depending on the shared styles package.
      </DocP>
      <DocH2>Not a runtime CSS library</DocH2>
      <DocP>
        Arvia compiles variants and states to static CSS at build time. Your app ships optimized styles — no
        runtime style injection, no boolean prop explosion. Dynamic values use CSS variables via theme tokens.
      </DocP>
      <DocH2>v0.1 components</DocH2>
      <DocP>
        The first release ships layout primitives (Box, Stack, Text, Heading) and essential UI (Button, Badge,
        Link, Card, Input, Divider, Spinner). More components and frameworks are on the way.
      </DocP>
    </DocProse>
  );
}
