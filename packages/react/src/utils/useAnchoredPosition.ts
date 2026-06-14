import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

type Options = {
  /** Space between anchor and floating element. */
  gap?: number;
  /** Match the floating element's min-width to the anchor width. */
  matchWidth?: boolean;
  /** Horizontal alignment to the anchor. */
  align?: "start" | "end";
};

/**
 * Positions a floating element (e.g. popover/menu/listbox) below its anchor using
 * fixed coordinates, flipping above when there isn't room and clamping to the
 * viewport. Recomputes on scroll/resize. Hidden until the first measure to avoid a
 * flash at (0,0). Attach `anchorRef` to the trigger and `floatingRef`+`style` to
 * the floating element (rendered in a portal).
 */
export function useAnchoredPosition<A extends HTMLElement, F extends HTMLElement>(
  open: boolean,
  options: Options = {},
) {
  const anchorRef = useRef<A>(null);
  const floatingRef = useRef<F>(null);
  const [style, setStyle] = useState<CSSProperties>({
    position: "fixed",
    top: 0,
    left: 0,
    visibility: "hidden",
  });

  useLayoutEffect(() => {
    if (!open) return;
    const { gap = 6, matchWidth = false, align = "start" } = options;

    function update() {
      const anchor = anchorRef.current;
      const floating = floatingRef.current;
      if (!anchor || !floating) return;
      const a = anchor.getBoundingClientRect();
      const f = floating.getBoundingClientRect();

      let top = a.bottom + gap;
      if (top + f.height > window.innerHeight - 8 && a.top - gap - f.height > 8) {
        top = a.top - gap - f.height;
      }
      let left = align === "end" ? a.right - f.width : a.left;
      left = Math.min(Math.max(8, left), Math.max(8, window.innerWidth - 8 - f.width));

      const next: CSSProperties = { position: "fixed", top, left, visibility: "visible" };
      if (matchWidth) next.minWidth = a.width;
      setStyle(next);
    }

    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return { anchorRef, floatingRef, style };
}
