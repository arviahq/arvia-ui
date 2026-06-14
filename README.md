# arvia-ui

React components built on [Arvia](https://github.com/arviahq/arvia). Styles compile to static CSS at publish time — no runtime styling engine.

[![npm version](https://img.shields.io/npm/v/@arvia-ui/react)](https://www.npmjs.com/package/@arvia-ui/react)
[![license](https://img.shields.io/npm/l/@arvia-ui/react)](https://github.com/arviahq/arvia-ui/blob/main/LICENSE)

## Install

```bash
npm install @arvia-ui/react
```

## Usage

```tsx
import { Button, Stack, Text } from "@arvia-ui/react";

export function App() {
  return (
    <Stack gap="4">
      <Text>Hello</Text>
      <Button tone="primary">Get started</Button>
    </Stack>
  );
}
```

Styles load automatically — no Vite plugin or separate CSS import.

Dark mode follows the OS by default. Pin it with `data-arvia-theme="dark"` on `<html>`. Override tokens via `--arvia-*` CSS variables.

## Docs

```bash
pnpm install
pnpm website
```

Component reference, theming guide, and live previews at `http://localhost:5173`.

## Development

```bash
pnpm verify   # format, lint, typecheck, build
pnpm changeset
```

See [PUBLISHING.md](PUBLISHING.md) for releases.

## License

[MIT](LICENSE)
