import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import {
  IconButton as iconButtonStyles,
  type IconButtonProps as ArviaIconButtonProps,
} from "@arvia-ui/core-styles/components/icon-button.arv";

export type IconButtonProps = ArviaIconButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    /** Icon content rendered inside the button. */
    children: ReactNode;
    /** Accessible label — required because the button has no visible text. */
    "aria-label": string;
    className?: string;
  };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { children, className, size, tone, type = "button", ...props },
  ref,
) {
  const styles = iconButtonStyles({ size, tone });
  return (
    <button
      ref={ref}
      type={type}
      className={className ? `${styles.root} ${className}` : styles.root}
      {...props}
    >
      <span className={styles.icon} aria-hidden>
        {children}
      </span>
    </button>
  );
});
