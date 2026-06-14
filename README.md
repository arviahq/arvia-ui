# arvia-ui

Beautiful, crafted React components built on [Arvia](https://github.com/arviahq/arvia).

Styles live in shared `.arv` files and compile to static CSS at publish time. The React package adds thin wrappers for semantics, accessibility, and composition — so you get typed variants and production-ready UI without a runtime styling engine.

[![CI](https://github.com/arviahq/arvia-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/arviahq/arvia-ui/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@arvia-ui/react)](https://www.npmjs.com/package/@arvia-ui/react)
[![license](https://img.shields.io/npm/l/@arvia-ui/react)](https://github.com/arviahq/arvia-ui/blob/main/LICENSE)

## Features

- **Zero-config install** — `npm install @arvia-ui/react` and import. Styles bundle automatically; no Vite plugin, no theme import, no `vite.config.ts` changes.
- **Compile-time CSS** — variants, states, and responsive rules compile from `.arv` to a single stylesheet. No CSS-in-JS, no style recalculation in the browser.
- **Fully typed** — every variant prop is a string union. Autocomplete tones, sizes, and states at compile time.
- **Light & dark modes** — both ship as native `light-dark()` tokens. Follows the OS by default; flip `data-arvia-theme` to pin it. No JS runtime.
- **Accessible defaults** — semantic HTML, forwarded refs, focus rings, keyboard navigation, and ARIA wiring where it matters.
- **Themeable** — override `--arvia-*` CSS variables globally or per subtree. No library API required.

## Install

```bash
npm install @arvia-ui/react
```

React 18+ is the only peer dependency. Works with any bundler.

## Quick start

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

Importing any component pulls in the pre-compiled CSS via `sideEffects` — you do not need a separate stylesheet import.

### Theme modes

Theming is pure native CSS — there is **no JavaScript runtime**. Color tokens compile to `light-dark()` driven by `color-scheme`, so the theme follows the OS by default. To pin or toggle the mode, set `data-arvia-theme` on `<html>`:

```html
<html data-arvia-theme="dark"></html>
```

```js
// One native DOM call — no library helper needed:
document.documentElement.setAttribute("data-arvia-theme", "dark");
```

`color-scheme` also themes native UA widgets (scrollbars, form controls, focus rings).

### Customizing tokens

Reassign `--arvia-*` CSS variables. Wrap mode-varying colors in `light-dark()` so a single declaration covers both modes (including OS-driven dark). Import your override stylesheet **after** `@arvia-ui/react`:

```css
/* brand.css */
:root {
  --arvia-color-primary: light-dark(#4f46e5, #635bff);
  --arvia-color-primaryHover: light-dark(#4338ca, #5249e6);
  --arvia-color-focus: light-dark(#4f46e5, #635bff);
}
```

Variables inherit — set them on any wrapper to rebrand a subtree. The docs site covers scoped islands, the full token reference, and FOUC-free persistence (`pnpm website` → `/docs/theming`).

> Requires a Baseline-2024 browser (Chrome 123+, Safari 17.5+, Firefox 120+) for `light-dark()`.

## Components

**Layout:** Box, Stack, Text, Heading

**Actions & navigation:** Button, Link, Badge, Breadcrumb, Menu

**Forms:** Input, Checkbox, CheckboxGroup, RadioGroup, Switch, Select, Slider

**Feedback:** Alert, Spinner, Progress, ProgressCircle, Skeleton, Toast

**Overlays:** Dialog, Popover, Tooltip, Tabs, Accordion

**Display:** Card, Avatar, Divider

Every component has live previews, interactive playgrounds, and a full props reference in the docs site.

## Packages

| Package                 | npm                                                                | Description                                                                                |
| ----------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `@arvia-ui/react`       | [`@arvia-ui/react`](https://www.npmjs.com/package/@arvia-ui/react) | React 18+ components + bundled CSS                                                         |
| `@arvia-ui/core-styles` | internal                                                           | Shared `.arv` theme and component styles (compiled into `@arvia-ui/react` at publish time) |

Future framework targets (`@arviahq/ui-vue`, `@arviahq/ui-preact`) will follow the same pattern.

## How it works

```
.arv component styles  →  Arvia compiler  →  static CSS
                              ↓
                    @arvia-ui/react wrappers  →  your app
```

1. **`@arvia-ui/core-styles`** holds `theme.arv` (design tokens) and one `.arv` file per component (variants, slots, states, responsive rules).
2. At publish time, Arvia compiles those files to CSS bundled in `@arvia-ui/react`.
3. React components map props to generated class names. Dynamic theming uses CSS custom properties, not runtime style injection.

To author your own `.arv` components or fork token definitions at build time, use [`@arviahq/vite-plugin-react`](https://github.com/arviahq/arvia). That path is for design-system authors — CSS variable overrides are the recommended way to rebrand an app.

## Documentation

Clone this repo and run the docs site:

```bash
pnpm install
pnpm website        # http://localhost:5173
pnpm storybook      # http://localhost:6007
```

Storybook lives in `packages/react`. The website in `apps/website` dogfoods `@arvia-ui/react` and hosts getting-started, theming, and per-component docs with live previews.

## Development

Requires Node ≥ 24 and pnpm 9.

```bash
git clone https://github.com/arviahq/arvia-ui.git
cd arvia-ui
pnpm install
pnpm verify         # format, lint, typecheck, build
```

| Script           | Description                 |
| ---------------- | --------------------------- |
| `pnpm website`   | Docs + marketing site       |
| `pnpm storybook` | Component stories           |
| `pnpm build`     | Build all packages          |
| `pnpm verify`    | Full CI check locally       |
| `pnpm changeset` | Add a changeset for release |

### Repo layout

```
arvia-ui/
  apps/
    website/           # Docs site
  packages/
    core-styles/       # @arvia-ui/core-styles — theme.arv + components/*.arv
    react/             # @arvia-ui/react — React wrappers + Storybook
```

## Contributing

Issues and pull requests are welcome.

1. Fork the repo and create a branch.
2. Make your change and run `pnpm verify`.
3. Add a changeset if your change should trigger a release: `pnpm changeset`.
4. Open a PR with a clear description of what changed and why.

CI runs on every push and PR: format check, lint, typecheck, and build ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

Releases: [`PUBLISHING.md`](PUBLISHING.md) — add a changeset in your PR, merge to `main`, then merge the Version Packages PR to publish.

## Related

- [arviahq/arvia](https://github.com/arviahq/arvia) — the Arvia compiler, Vite plugin, and language tooling

## License

[MIT](LICENSE)
