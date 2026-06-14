import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsdown";

const root = path.dirname(fileURLToPath(import.meta.url));
const generatedDir = path.join(root, "generated");

// `@arvia-ui/core-styles/theme.arv` or `@arvia-ui/core-styles/components/button.arv`
const ARV_SPECIFIER = /^@arvia-ui\/core-styles\/(?:components\/)?([\w-]+)\.arv$/;

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  dts: true,
  outDir: "dist",
  clean: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  // Side-effect import of the bundled stylesheet, prepended to dist/index.js so
  // importing any component pulls in the styles automatically (kept by `sideEffects`).
  banner: { js: 'import "./styles.css";' },
  // Ship the stylesheet that compile-styles produced alongside the bundle.
  copy: [{ from: "generated/styles.css", to: "dist" }],
  plugins: [
    {
      // At build time the components' `.arv` imports are wired to the JS that
      // scripts/compile-styles.mjs pre-compiled into generated/, so the published
      // bundle contains plain JS — no Arvia compiler or Vite plugin at the consumer.
      name: "arvia-resolve-generated",
      resolveId(id) {
        const match = id.match(ARV_SPECIFIER);
        return match ? path.join(generatedDir, `${match[1]}.mjs`) : null;
      },
    },
  ],
});
