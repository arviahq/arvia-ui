import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Checkbox as checkboxStyles } from "@arviahq/ui-styles/components/checkbox.arv";
import { useControllableState } from "@arviahq/react-primitives";

export type CheckboxProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "checked" | "defaultChecked" | "value"
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { checked, defaultChecked, onChange, disabled, className, onClick, ...props },
  ref,
) {
  const styles = checkboxStyles();
  const [on, setOn] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange,
  });

  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={on}
      data-state={on ? "checked" : "unchecked"}
      disabled={disabled}
      className={className ? `${styles.root} ${className}` : styles.root}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOn(!on);
      }}
      {...props}
    >
      {on ? (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : null}
    </button>
  );
});
