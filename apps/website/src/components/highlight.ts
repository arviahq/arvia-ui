// Lazy Shiki highlighter — grammars/themes are dynamically imported so they land
// in their own chunk instead of the main bundle. Uses dual themes (github-light +
// github-dark) so a single highlight pass switches with the site theme via CSS
// variables (see code.css).
import type { HighlighterCore } from "shiki/core";

let highlighter: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighter) {
    highlighter = (async () => {
      const [{ createHighlighterCore }, { createJavaScriptRegexEngine }, tsx, ts, bash, light, dark] =
        await Promise.all([
          import("shiki/core"),
          import("shiki/engine/javascript"),
          import("shiki/langs/tsx.mjs"),
          import("shiki/langs/typescript.mjs"),
          import("shiki/langs/bash.mjs"),
          import("shiki/themes/github-light.mjs"),
          import("shiki/themes/github-dark.mjs"),
        ]);
      return createHighlighterCore({
        themes: [light.default, dark.default],
        langs: [tsx.default, ts.default, bash.default],
        engine: createJavaScriptRegexEngine(),
      });
    })();
  }
  return highlighter;
}

export function detectLang(code: string): string {
  if (/^\s*(npm|pnpm|yarn|npx|bun|node|cd|git)\b/.test(code)) return "bash";
  return "tsx";
}

export async function highlightCode(code: string, lang: string): Promise<string> {
  const h = await getHighlighter();
  const loaded = h.getLoadedLanguages().includes(lang as never) ? lang : "tsx";
  return h.codeToHtml(code.trimEnd(), {
    lang: loaded,
    themes: { light: "github-light", dark: "github-dark" },
  });
}
