import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import {
  Stack as stackStyles,
  type StackProps as ArviaStackProps,
} from "@arviahq/ui-styles/components/stack.arv";

export type StackProps = ArviaStackProps &
  Omit<HTMLAttributes<HTMLElement>, "children" | "className"> & {
    as?: ElementType;
    children?: ReactNode;
    className?: string;
  };

export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  { as: Component = "div", children, className, direction, gap, align, justify, wrap, ...props },
  ref,
) {
  const styles = stackStyles({ direction, gap, align, justify, wrap });
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
