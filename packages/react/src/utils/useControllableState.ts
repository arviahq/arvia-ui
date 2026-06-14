import { useCallback, useRef, useState } from "react";

/**
 * Supports both controlled (`value` + `onChange`) and uncontrolled (`defaultValue`)
 * usage with one API. When `value` is provided the component is controlled and the
 * internal state is ignored; otherwise state is local and `onChange` still fires.
 */
export function useControllableState<T>(params: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}): [T, (next: T) => void] {
  const { value, defaultValue, onChange } = params;
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const state = isControlled ? (value as T) : uncontrolled;

  const setState = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [state, setState];
}
