import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  Alert as alertStyles,
  type AlertProps as ArviaAlertProps,
} from "@arviahq/ui-styles/components/alert.arv";

type Tone = NonNullable<ArviaAlertProps["tone"]>;

const DEFAULT_ICONS: Record<Tone, ReactNode> = {
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  success: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="8 12 11 15 16 9" />
    </>
  ),
  warning: (
    <>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  danger: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </>
  ),
};

export type AlertProps = ArviaAlertProps &
  Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
    /** Heading line. */
    title?: ReactNode;
    /** Override the default tone icon. */
    icon?: ReactNode;
    /** Body content. */
    children?: ReactNode;
    className?: string;
  };

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { tone = "info", title, icon, children, className, ...props },
  ref,
) {
  const styles = alertStyles({ tone });

  return (
    <div
      ref={ref}
      role="alert"
      className={className ? `${styles.root} ${className}` : styles.root}
      {...props}
    >
      <span className={styles.icon}>
        {icon ?? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            {DEFAULT_ICONS[tone]}
          </svg>
        )}
      </span>
      <div className={styles.content}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {children ? <div className={styles.body}>{children}</div> : null}
      </div>
    </div>
  );
});
