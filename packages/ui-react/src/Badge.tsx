import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  Badge as badgeStyles,
  type BadgeProps as ArviaBadgeProps,
} from "@arviahq/ui-styles/components/badge.arv";

export type BadgeProps = ArviaBadgeProps &
  Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    children?: ReactNode;
    className?: string;
  };

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, className, tone, size, ...props },
  ref,
) {
  const styles = badgeStyles({ tone, size });
  return (
    <span ref={ref} className={className ? `${styles.root} ${className}` : styles.root} {...props}>
      {children}
    </span>
  );
});
