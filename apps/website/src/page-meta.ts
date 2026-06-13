import { useEffect } from "react";

export function usePageMeta(title?: string, description?: string): void {
  useEffect(() => {
    document.title = title ? `${title} — arvia-ui` : "arvia-ui — Components built on Arvia";
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute("content", description);
  }, [title, description]);
}
