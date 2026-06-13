import { useEffect, useRef, type RefObject } from "react";

/**
 * Calls `handler` on a pointerdown outside every element in `refs`, while `active`.
 * Use for dismissing popovers/menus/selects on outside click.
 */
export function useOnClickOutside(
  active: boolean,
  handler: () => void,
  refs: RefObject<HTMLElement | null>[],
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!active) return;
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (refs.some((ref) => ref.current?.contains(target))) return;
      handlerRef.current();
    }
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
