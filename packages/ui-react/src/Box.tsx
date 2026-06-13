import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { Box as boxStyles, type BoxProps as ArviaBoxProps } from "@arviahq/ui-styles/components/box.arv";

export type BoxProps = ArviaBoxProps &
  Omit<HTMLAttributes<HTMLElement>, "children" | "className"> & {
    as?: ElementType;
    children?: ReactNode;
    className?: string;
  };

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  { as: Component = "div", children, className, padding, radius, background, ...props },
  ref,
) {
  const styles = boxStyles({ padding, radius, background });
  return (
    <Component ref={ref} className={className ? `${styles.root} ${className}` : styles.root} {...props}>
      {children}
    </Component>
  );
});
