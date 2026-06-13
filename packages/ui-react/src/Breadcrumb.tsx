import {
  Children,
  forwardRef,
  isValidElement,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Breadcrumb as breadcrumbStyles } from "@arviahq/ui-styles/components/breadcrumb.arv";

export type BreadcrumbProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  /** Separator rendered between items. */
  separator?: ReactNode;
  children?: ReactNode;
  className?: string;
};

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { separator = "/", children, className, "aria-label": ariaLabel, ...props },
  ref,
) {
  const styles = breadcrumbStyles();
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel ?? "Breadcrumb"}
      className={className ? `${styles.root} ${className}` : styles.root}
      {...props}
    >
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            {item}
            {index < items.length - 1 ? (
              <span className={styles.separator} aria-hidden>
                {separator}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
});

export type BreadcrumbItemProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Marks the current page (renders text with aria-current instead of a link). */
  current?: boolean;
  children?: ReactNode;
  className?: string;
};

const BreadcrumbItem = forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(function BreadcrumbItem(
  { current, href, children, className, ...props },
  ref,
) {
  const styles = breadcrumbStyles();

  if (current || !href) {
    return (
      <span
        className={className ? `${styles.current} ${className}` : styles.current}
        aria-current="page"
      >
        {children}
      </span>
    );
  }

  return (
    <a
      ref={ref}
      href={href}
      className={className ? `${styles.link} ${className}` : styles.link}
      {...props}
    >
      {children}
    </a>
  );
});

/**
 * Breadcrumb trail:
 *
 *   <Breadcrumb>
 *     <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
 *     <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
 *     <Breadcrumb.Item current>Breadcrumb</Breadcrumb.Item>
 *   </Breadcrumb>
 */
export const Breadcrumb = Object.assign(BreadcrumbRoot, { Item: BreadcrumbItem });
