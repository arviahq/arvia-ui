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
npm install @arviahq/ui-react
```

```tsx
import { Button, Stack, Text } from "@arviahq/ui-react";

export function App() {
  return (
    <Stack gap="4">
      <Text>Welcome to arvia-ui.</Text>
      <Button tone="primary">Get started</Button>
    </Stack>
  );
}
```

That is all. Styles are pre-compiled and bundled into the package — importing any
component pulls in the CSS automatically (via `sideEffects`). No Vite plugin, no
`vite.config.ts` change, no theme import. React 18+ is the only peer dependency.

Switch theme modes at runtime:

```tsx
import { setTheme } from "@arviahq/ui-react";

setTheme("dark"); // sets data-arvia-theme on <html>; light/dark CSS is already bundled
```

### Advanced: fork the theme

To author your own `.arv` components or fork the theme tokens, compile `.arv` at
build time with [`@arviahq/vite-plugin-react`](https://github.com/arviahq/arvia).
This is for design-system authors — it is **not** required to use arvia-ui.

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
