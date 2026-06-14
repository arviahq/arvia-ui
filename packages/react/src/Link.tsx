import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import {
  Link as linkStyles,
  type LinkProps as ArviaLinkProps,
} from "@arvia-ui/core-styles/components/link.arv";

export type LinkProps = ArviaLinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
    children?: ReactNode;
    className?: string;
  };

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, className, tone, size, ...props },
  ref,
) {
  const styles = linkStyles({ tone, size });
  return (
    <a ref={ref} className={className ? `${styles.root} ${className}` : styles.root} {...props}>
      {children}
    </a>
  );
});
