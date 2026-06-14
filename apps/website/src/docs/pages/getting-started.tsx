import { DocHeader } from "../../components/DocsShell";
import { DocH2, DocH3, DocP, DocPre, DocProse } from "../../components/DocProse";
import type { DocPageMeta } from "../registry";

export const gettingStartedMeta: DocPageMeta = {
  slug: "getting-started",
  title: "Getting started",
  description: "Install arvia-ui in any React project and render your first components.",
};

export function GettingStartedPage() {
  return (
    <DocProse>
      <DocHeader {...gettingStartedMeta} />
      <DocH2>Install</DocH2>
      <DocPre>{`npm install @arvia-ui/react`}</DocPre>
      <DocP>
        That is all you need. Styles are pre-compiled and bundled with the package — no Vite plugin,
        no <code>vite.config.ts</code> change, and no theme import. React 18+ is the only peer
        dependency, so it works with any bundler.
      </DocP>
      <DocH2>Use components</DocH2>
      <DocP>
        Importing from <code>@arvia-ui/react</code> automatically includes the component styles (via{" "}
        <code>sideEffects</code>):
      </DocP>
      <DocPre>{`import { Button, Stack, Text } from "@arvia-ui/react";

export function App() {
  return (
    <Stack gap="4">
      <Text>Welcome to arvia-ui.</Text>
      <Button tone="primary">Get started</Button>
    </Stack>
  );
}`}</DocPre>
      <DocH2>Theme modes</DocH2>
      <DocP>
        Both light and dark CSS are baked into the package. Switch at runtime with{" "}
        <code>setTheme</code>, which sets <code>data-arvia-theme</code> on <code>&lt;html&gt;</code>
        :
      </DocP>
      <DocPre>{`import { setTheme } from "@arvia-ui/react";

setTheme("dark");
setTheme("light");`}</DocPre>
      <DocH3>Advanced: fork the theme</DocH3>
      <DocP>
        To author your own <code>.arv</code> components or fork the theme tokens, compile{" "}
        <code>.arv</code> at build time with <code>@arviahq/vite-plugin-react</code>. This is for
        design-system authors — it is not required to use arvia-ui.
      </DocP>
    </DocProse>
  );
}
