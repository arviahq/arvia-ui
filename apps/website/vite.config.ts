import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { arvia } from "@arviahq/vite-plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      // @arviahq/ui-react ships pre-compiled dist/. For local docs dev, use its
      // source so component/.arv edits hot-reload through the arvia plugin below.
      "@arviahq/ui-react": new URL("../../packages/ui-react/src/index.ts", import.meta.url).pathname,
    },
  },
  plugins: [
    arvia({ theme: "../../packages/styles/src/theme.arv" }),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
  ],
});
