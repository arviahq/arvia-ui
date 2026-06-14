import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Switch as switchStyles } from "@arvia-ui/core-styles/components/switch.arv";
import { useControllableState } from "./utils";

export type SwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "checked" | "defaultChecked" | "value"
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked, defaultChecked, onChange, size, disabled, className, onClick, ...props },
  ref,
) {
  const styles = switchStyles({ size });
  const [on, setOn] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange,
  });

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
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
      <span className={styles.thumb} />
    </button>
  );
});
