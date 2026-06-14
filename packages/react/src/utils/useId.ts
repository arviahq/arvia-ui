import { useId as useReactId } from "react";

/** Stable SSR-safe id, honoring a caller-provided id when present. */
export function useId(provided?: string): string {
  const generated = useReactId();
  return provided ?? generated;
}
