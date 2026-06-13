import { forwardRef, type HTMLAttributes } from "react";
import {
  Progress as progressStyles,
  type ProgressProps as ArviaProgressProps,
} from "@arviahq/ui-styles/components/progress.arv";

export type ProgressProps = ArviaProgressProps &
  Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    /** Current value. */
    value: number;
    /** Maximum value (default 100). */
    max?: number;
    className?: string;
  };

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value, max = 100, tone, size, className, ...props },
  ref,
) {
  const styles = progressStyles({ tone, size });
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={className ? `${styles.root} ${className}` : styles.root}
      {...props}
    >
      <div className={styles.bar} style={{ width: `${pct}%` }} />
    </div>
  );
});
