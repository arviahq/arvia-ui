# arvia-ui

Beautiful, crafted UI components built on [Arvia](https://github.com/arviahq/arvia). Styles live in shared `.arv` files; each framework package adds thin wrappers for semantics, accessibility, and composition.

```bash
pnpm install
pnpm website
```

Website dev server: [http://localhost:5173](http://localhost:5173)  
Storybook: `pnpm storybook` → [http://localhost:6007](http://localhost:6007)

## Packages

| Package | Import | Status |
|---------|--------|--------|
| `@arviahq/ui-styles` | internal | Shared `.arv` theme + components |
| `@arviahq/ui-react` | `@arviahq/ui-react` | React 18+ (v0.1) |
| `@arviahq/ui-vue` | `@arviahq/ui-vue` | Planned |
| `@arviahq/ui-preact` | `@arviahq/ui-preact` | Planned |

## Usage (React)

```bash
npm install @arviahq/ui-react @arviahq/vite-plugin-react
```

```ts
// vite.config.ts
import { arvia } from "@arviahq/vite-plugin-react";

export default defineConfig({
  plugins: [
    arvia({ theme: "node_modules/@arviahq/ui-styles/src/theme.arv" }),
    react(),
  ],
});
```

```tsx
import { Button, Stack, Text } from "@arviahq/ui-react";
import "@arviahq/ui-styles/theme.arv";

export function App() {
  return (
    <Stack gap="4">
      <Text>Welcome to arvia-ui.</Text>
      <Button tone="primary">Get started</Button>
    </Stack>
  );
}
```

## v0.1 components

**Primitives:** Box, Stack, Text, Heading

**Components:** Button, Badge, Link, Card, Input, Divider, Spinner

## Repo layout

```
arvia-ui/
  apps/
    website/         # Marketing + docs site (dogfoods @arviahq/ui-react)
  packages/
    styles/          # @arviahq/ui-styles — shared theme.arv + components/*.arv
    ui-react/        # @arviahq/ui-react — React wrappers + Storybook
    ui-vue/          # (planned)
    ui-preact/       # (planned)
```

## Related repos

- [arviahq/arvia](https://github.com/arviahq/arvia) — the Arvia compiler and tooling

## License

MIT
