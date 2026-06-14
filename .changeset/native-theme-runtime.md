---
"@arvia-ui/react": minor
"@arvia-ui/core-styles": minor
---

Theming is now pure native CSS — the `setTheme` runtime export has been removed.

**Breaking:** `import { setTheme } from "@arvia-ui/react"` no longer exists. Switch the
mode with a native DOM call instead:

```js
document.documentElement.setAttribute("data-arvia-theme", "dark");
```

Color tokens now compile to a single `light-dark(light, dark)` declaration driven by
`color-scheme`, so the theme follows the OS by default, native UA widgets (scrollbars,
form controls, focus rings) follow the active scheme, and the generated stylesheet is
smaller. Requires a Baseline-2024 browser (Chrome 123+, Safari 17.5+, Firefox 120+).
</content>
