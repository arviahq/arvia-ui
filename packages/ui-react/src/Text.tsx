import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import {
  Text as textStyles,
  type TextProps as ArviaTextProps,
} from "@arviahq/ui-styles/components/text.arv";

export type TextProps = ArviaTextProps &
  Omit<HTMLAttributes<HTMLElement>, "children" | "className"> & {
    as?: ElementType;
    children?: ReactNode;
    className?: string;
  };

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { as: Component = "p", children, className, size, weight, tone, ...props },
  ref,
) {
  const styles = textStyles({ size, weight, tone });
  return (
    <Component
      ref={ref}
      className={className ? `${styles.root} ${className}` : styles.root}
      {...props}
    >
      {children}
    </Component>
  );
});
