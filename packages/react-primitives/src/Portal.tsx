import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Renders children into `container` (default document.body). Resolves the target
 * synchronously on the client so the portaled subtree mounts in the same commit
 * (important for refs/focus management); returns null during SSR.
 */
export function Portal(props: { children: ReactNode; container?: Element | null }) {
  const [target] = useState<Element | null>(() =>
    typeof document !== "undefined" ? (props.container ?? document.body) : null,
  );
  if (!target) return null;
  return createPortal(props.children, target);
}
