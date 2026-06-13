import { useEffect, useState } from "react";
import { Prose } from "../site.arv";
import { detectLang, highlightCode } from "./highlight";

export function CodeBlock(props: { children: string; lang?: string }) {
  const prose = Prose();
  const code = props.children;
  const lang = props.lang ?? detectLang(code);
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    highlightCode(code, lang)
      .then((result) => {
        if (!cancelled) setHtml(result);
      })
      .catch(() => {
        if (!cancelled) setHtml(null);
      });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  // Until Shiki resolves, render the plain (styled) pre so layout doesn't jump.
  if (!html) return <pre className={prose.pre}>{code}</pre>;
  return <div className="code-block" dangerouslySetInnerHTML={{ __html: html }} />;
}
