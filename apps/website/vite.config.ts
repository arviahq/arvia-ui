import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { arvia } from "@arviahq/vite-plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      // @arvia-ui/react ships pre-compiled dist/. For local docs dev, use its
      // source so component/.arv edits hot-reload through the arvia plugin below.
      "@arvia-ui/react": new URL("../../packages/react/src/index.ts", import.meta.url).pathname,
    },
  },
  plugins: [
    arvia({ theme: "../../packages/core-styles/src/theme.arv" }),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
  ],
});
