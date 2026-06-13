import { forwardRef, type HTMLAttributes } from "react";
import {
  Divider as dividerStyles,
  type DividerProps as ArviaDividerProps,
} from "@arviahq/ui-styles/components/divider.arv";

export type DividerProps = ArviaDividerProps &
  Omit<HTMLAttributes<HTMLHRElement>, "children"> & {
    className?: string;
  };

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { className, spacing, ...props },
  ref,
) {
  const styles = dividerStyles({ spacing });
  return (
    <hr ref={ref} className={className ? `${styles.root} ${className}` : styles.root} {...props} />
  );
});
