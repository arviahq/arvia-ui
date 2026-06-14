# arvia-ui

Beautiful, crafted UI components built on [Arvia](https://github.com/arviahq/arvia). Styles live in shared `.arv` files; each framework package adds thin wrappers for semantics, accessibility, and composition.

```bash
pnpm install
pnpm website
```

Website dev server: [http://localhost:5173](http://localhost:5173)  
Storybook: `pnpm storybook` → [http://localhost:6007](http://localhost:6007)

## Packages

| Package                 | Import               | Status                           |
| ----------------------- | -------------------- | -------------------------------- |
| `@arvia-ui/core-styles` | internal             | Shared `.arv` theme + components |
| `@arvia-ui/react`       | `@arvia-ui/react`    | React 18+ (v0.1)                 |
| `@arviahq/ui-vue`       | `@arviahq/ui-vue`    | Planned                          |
| `@arviahq/ui-preact`    | `@arviahq/ui-preact` | Planned                          |

## Usage (React)

```bash
npm install @arvia-ui/react
```

```tsx
import { Button, Stack, Text } from "@arvia-ui/react";

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
import { setTheme } from "@arvia-ui/react";

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
    website/         # Marketing + docs site (dogfoods @arvia-ui/react)
  packages/
    core-styles/     # @arvia-ui/core-styles — shared theme.arv + components/*.arv
    react/           # @arvia-ui/react — React wrappers + Storybook
    ui-vue/          # (planned)
    ui-preact/       # (planned)
```

## CI and releases

Pull requests and pushes to `main` run [`.github/workflows/ci.yml`](.github/workflows/ci.yml): format check, lint, typecheck, and build.

Releases use [Changesets](https://github.com/changesets/changesets) via [`.github/workflows/release.yml`](.github/workflows/release.yml). After merge, the workflow opens a version PR or publishes to npm when versions are bumped.

**One-time setup for publishing:**

1. GitHub → Settings → Actions → General → enable **Read and write permissions** and **Allow GitHub Actions to create pull requests**.
2. On [npmjs.com](https://www.npmjs.com), add a **Trusted Publisher** for `@arvia-ui/react` and `@arvia-ui/core-styles` pointing to `arviahq/arvia-ui`, workflow file `release.yml`, branch `main`.

To include a release note with your change:

```bash
pnpm changeset
```

Run the same checks locally with `pnpm verify`.

## Related repos

- [arviahq/arvia](https://github.com/arviahq/arvia) — the Arvia compiler and tooling

## License

MIT
