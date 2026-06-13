import { useCallback, type MutableRefObject, type Ref } from "react";

type PossibleRef<T> = Ref<T> | undefined;

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") ref(value);
  else if (ref != null) (ref as MutableRefObject<T | null>).current = value;
}

/** Merge several refs (e.g. a forwarded ref plus an internal one) into a single callback ref. */
export function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((node: T) => {
    for (const ref of refs) setRef(ref, node);
  }, refs);
}
