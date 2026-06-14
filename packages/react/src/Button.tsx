import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import {
  Button as buttonStyles,
  type ButtonProps as ArviaButtonProps,
} from "@arvia-ui/core-styles/components/button.arv";

export type ButtonProps = ArviaButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    children?: ReactNode;
    icon?: ReactNode;
    className?: string;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, icon, className, size, tone, type = "button", ...props },
  ref,
) {
  const styles = buttonStyles({ size, tone });
  return (
    <button
      ref={ref}
      type={type}
      className={className ? `${styles.root} ${className}` : styles.root}
      {...props}
    >
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {children ? <span className={styles.label}>{children}</span> : null}
    </button>
  );
});
