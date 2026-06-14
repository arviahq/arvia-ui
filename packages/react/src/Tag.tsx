import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  Tag as tagStyles,
  type TagProps as ArviaTagProps,
} from "@arvia-ui/core-styles/components/tag.arv";

export type TagProps = ArviaTagProps &
  Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    children?: ReactNode;
    /** When provided, renders a remove button that calls this handler. */
    onRemove?: () => void;
    className?: string;
  };

function RemoveIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { children, className, tone, size, onRemove, ...props },
  ref,
) {
  const styles = tagStyles({ tone, size });
  const label = typeof children === "string" ? children : undefined;

  return (
    <span ref={ref} className={className ? `${styles.root} ${className}` : styles.root} {...props}>
      <span className={styles.label}>{children}</span>
      {onRemove ? (
        <button
          type="button"
          className={styles.remove}
          aria-label={label ? `Remove ${label}` : "Remove tag"}
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
        >
          <RemoveIcon />
        </button>
      ) : null}
    </span>
  );
});
