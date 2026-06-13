import { DocHeader } from "../../components/DocsShell";
import { DocH2, DocH3, DocP, DocPre, DocProse, DocUl, DocLi } from "../../components/DocProse";
import type { DocPageMeta } from "../registry";

export const gettingStartedMeta: DocPageMeta = {
  slug: "getting-started",
  title: "Getting started",
  description: "Install arvia-ui in a Vite + React project and render your first components.",
};

export function GettingStartedPage() {
  return (
    <DocProse>
      <DocHeader {...gettingStartedMeta} />
      <DocH2>Install</DocH2>
      <DocPre>{`npm install @arviahq/ui-react @arviahq/ui-styles @arviahq/vite-plugin-react`}</DocPre>
      <DocH2>Configure Vite</DocH2>
      <DocP>
        Add the Arvia plugin before the React plugin. Point it at the shared theme from{" "}
        <code>@arviahq/ui-styles</code>:
      </DocP>
      <DocPre>{`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { arvia } from "@arviahq/vite-plugin-react";

export default defineConfig({
  plugins: [
    arvia({ theme: "node_modules/@arviahq/ui-styles/src/theme.arv" }),
    react(),
  ],
});`}</DocPre>
      <DocH2>Import the theme</DocH2>
      <DocP>Import the global theme once in your app entry so tokens, modes, and base styles apply:</DocP>
      <DocPre>{`import "@arviahq/ui-styles/theme.arv";`}</DocPre>
      <DocH2>Use components</DocH2>
      <DocPre>{`import { Button, Stack, Text } from "@arviahq/ui-react";

export function App() {
  return (
    <Stack gap="4">
      <Text>Welcome to arvia-ui.</Text>
      <Button tone="primary">Get started</Button>
    </Stack>
  );
}`}</DocPre>
      <DocH3>TypeScript</DocH3>
      <DocP>
        Add <code>rootDirs</code> so <code>tsc</code> resolves generated <code>.arv</code> types if you import
        style files directly:
      </DocP>
      <DocPre>{`{
  "compilerOptions": {
    "rootDirs": ["src", "node_modules/@arviahq/ui-styles/.arvia/types"]
  }
}`}</DocPre>
      <DocH2>Monorepo consumers</DocH2>
      <DocP>
        If you vendor the packages locally, depend on <code>@arviahq/ui-react</code> and{" "}
        <code>@arviahq/ui-styles</code> via workspace protocol and point the Vite theme at{" "}
        <code>packages/styles/src/theme.arv</code>.
      </DocP>
    </DocProse>
  );
}
