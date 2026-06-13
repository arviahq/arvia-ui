import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Card as cardStyles, type CardProps as ArviaCardProps } from "@arviahq/ui-styles/components/card.arv";

export type CardProps = ArviaCardProps &
  Omit<HTMLAttributes<HTMLDivElement>, "children" | "className"> & {
    children?: ReactNode;
    className?: string;
  };

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className, padding, shadow, ...props },
  ref,
) {
  const styles = cardStyles({ padding, shadow });
  return (
    <div ref={ref} className={className ? `${styles.root} ${className}` : styles.root} {...props}>
      {children}
    </div>
  );
});
