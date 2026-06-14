import { DocHeader } from "../../components/DocsShell";
import { DocCode, DocH2, DocP, DocProse, DocUl, DocLi } from "../../components/DocProse";
import type { DocPageMeta } from "../registry";

export const introductionMeta: DocPageMeta = {
  slug: "introduction",
  title: "Introduction",
  description:
    "What arvia-ui is, how it relates to Arvia, and why the architecture is split across packages.",
};

export function IntroductionPage() {
  return (
    <DocProse>
      <DocHeader {...introductionMeta} />
      <DocP>
        arvia-ui is a collection of beautiful, crafted UI components built on{" "}
        <a href="https://github.com/arviahq/arvia">Arvia</a>. Styles live in shared{" "}
        <DocCode>.arv</DocCode> files; each framework package adds thin wrappers for semantics,
        accessibility, and composition.
      </DocP>
      <DocH2>One package to install</DocH2>
      <DocUl>
        <DocLi>
          <DocCode>@arvia-ui/react</DocCode> — the only package you install: React 18+ components
          plus their bundled, pre-compiled CSS
        </DocLi>
        <DocLi>
          <DocCode>@arvia-ui/core-styles</DocCode> — the shared <DocCode>.arv</DocCode> theme
          tokens, recipes, and component styles. Compiled into <DocCode>@arvia-ui/react</DocCode> at
          publish time, so consumers never install it directly
        </DocLi>
      </DocUl>
      <DocP>
        Future framework targets follow the same pattern: <DocCode>@arviahq/ui-vue</DocCode>,{" "}
        <DocCode>@arviahq/ui-preact</DocCode>, each bundling the shared styles at publish time.
      </DocP>
      <DocH2>Not a runtime CSS library</DocH2>
      <DocP>
        Arvia compiles variants and states to static CSS at build time. Your app ships optimized
        styles — no runtime style injection, no boolean prop explosion. Dynamic values use CSS
        variables via theme tokens.
      </DocP>
      <DocH2>v0.1 components</DocH2>
      <DocP>
        The first release ships layout primitives (Box, Stack, Text, Heading) and essential UI
        (Button, Badge, Link, Card, Input, Divider, Spinner). More components and frameworks are on
        the way.
      </DocP>
    </DocProse>
  );
}
