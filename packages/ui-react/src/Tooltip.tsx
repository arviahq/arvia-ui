import { cloneElement, isValidElement, useState, type ReactElement, type ReactNode } from "react";
import { Tooltip as tooltipStyles } from "@arviahq/ui-styles/components/tooltip.arv";
import { useId } from "@arviahq/react-primitives";

export type TooltipProps = {
  /** Tooltip text/content shown on hover or focus. */
  label: ReactNode;
  /** The trigger element. */
  children: ReactNode;
  className?: string;
};

export function Tooltip({ label, children, className }: TooltipProps) {
  const styles = tooltipStyles();
  const [open, setOpen] = useState(false);
  const id = useId();

  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<{ "aria-describedby"?: string }>, {
        "aria-describedby": open ? id : undefined,
      })
    : children;

  return (
    <span
      className={className ? `${styles.root} ${className}` : styles.root}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {trigger}
      {open ? (
        <span role="tooltip" id={id} className={styles.bubble}>
          {label}
        </span>
      ) : null}
    </span>
  );
}
