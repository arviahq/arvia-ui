# @arvia-ui/react

## 0.3.0

### Minor Changes

- a5f2928: - Upgrade to `@arviahq/compiler` and `@arviahq/vite-plugin-react` v2 (raw `@keyframes`, nested `@media` instead of `responsive` blocks).
  - Switch default theme palette from teal/stone to indigo/zinc.
  - Add Drawer, IconButton, ColorPicker, Textarea, Tag, and OTP components.
  - Fix Tabs baseline with a full-width divider and left-aligned tabs; add `Tabs.List align="inline"` for compact layouts.

## 0.2.1

### Patch Changes

- c763521: Document Changesets CLI workflow and align release process with arvia.

## 0.2.0

### Minor Changes

- 67ef9dd: Theming is now pure native CSS — the `setTheme` runtime export has been removed.

  **Breaking:** `import { setTheme } from "@arvia-ui/react"` no longer exists. Switch the
  mode with a native DOM call instead:

  ```js
  document.documentElement.setAttribute("data-arvia-theme", "dark");
  ```

  Color tokens now compile to a single `light-dark(light, dark)` declaration driven by
  `color-scheme`, so the theme follows the OS by default, native UA widgets (scrollbars,
  form controls, focus rings) follow the active scheme, and the generated stylesheet is
  smaller. Requires a Baseline-2024 browser (Chrome 123+, Safari 17.5+, Firefox 120+).

## 0.1.0

### Minor Changes

- Initial public release under the `@arvia-ui` npm scope.
