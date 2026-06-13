import { forwardRef, type HTMLAttributes } from "react";
import { Spinner as spinnerStyles, type SpinnerProps as ArviaSpinnerProps } from "@arviahq/ui-styles/components/spinner.arv";

export type SpinnerProps = ArviaSpinnerProps &
  Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    className?: string;
    label?: string;
  };

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { className, size, label = "Loading", ...props },
  ref,
) {
  const styles = spinnerStyles({ size });
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={className ? `${styles.root} ${className}` : styles.root}
      {...props}
    />
  );
});
