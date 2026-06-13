import {
  forwardRef,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Slider as sliderStyles } from "@arviahq/ui-styles/components/slider.arv";
import { useComposedRefs, useControllableState } from "@arviahq/react-primitives";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export type SliderProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> & {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
};

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  { value, defaultValue, onChange, min = 0, max = 100, step = 1, disabled, className, ...props },
  ref,
) {
  const styles = sliderStyles();
  const trackRef = useRef<HTMLDivElement>(null);
  const composedRef = useComposedRefs(trackRef, ref);
  const [val, setVal] = useControllableState({
    value,
    defaultValue: defaultValue ?? min,
    onChange,
  });

  const current = clamp(val, min, max);
  const pct = ((current - min) / (max - min)) * 100;

  function setFromClientX(clientX: number) {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const raw = min + ratio * (max - min);
    setVal(clamp(min + Math.round((raw - min) / step) * step, min, max));
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    setFromClientX(event.clientX);
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLSpanElement>) {
    if (disabled) return;
    let next = current;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") next = current + step;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = current - step;
    else if (event.key === "Home") next = min;
    else if (event.key === "End") next = max;
    else return;
    event.preventDefault();
    setVal(clamp(next, min, max));
  }

  return (
    <div
      ref={composedRef}
      className={className ? `${styles.root} ${className}` : styles.root}
      data-disabled={disabled || undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      {...props}
    >
      <span className={styles.track} />
      <span className={styles.range} style={{ width: `${pct}%` }} />
      <span
        className={styles.thumb}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-disabled={disabled || undefined}
        style={{ left: `${pct}%` }}
        onKeyDown={onKeyDown}
      />
    </div>
  );
});
