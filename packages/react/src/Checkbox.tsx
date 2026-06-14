import {
  createContext,
  forwardRef,
  useContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Checkbox as checkboxStyles } from "@arvia-ui/core-styles/components/checkbox.arv";
import { CheckboxGroup as checkboxGroupStyles } from "@arvia-ui/core-styles/components/checkbox-group.arv";
import { useControllableState } from "./utils";

type Size = "sm" | "md" | "lg";

type CheckboxGroupContextValue = {
  values: string[];
  toggle: (value: string) => void;
  size?: Size;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export type CheckboxGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> & {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  size?: Size;
  children?: ReactNode;
  className?: string;
};

const CheckboxGroupRoot = forwardRef<HTMLDivElement, CheckboxGroupProps>(function CheckboxGroup(
  { value, defaultValue, onChange, size, children, className, ...props },
  ref,
) {
  const styles = checkboxGroupStyles();
  const [values, setValues] = useControllableState<string[]>({
    value,
    defaultValue: defaultValue ?? [],
    onChange,
  });

  const ctx: CheckboxGroupContextValue = {
    values,
    toggle: (v) => setValues(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]),
    size,
  };

  return (
    <CheckboxGroupContext.Provider value={ctx}>
      <div
        ref={ref}
        role="group"
        className={className ? `${styles.root} ${className}` : styles.root}
        {...props}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
});

export type CheckboxProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "checked" | "defaultChecked" | "value"
> & {
  /** Value toggled within a CheckboxGroup. */
  value?: string;
  /** Checked state when used standalone (controlled). */
  checked?: boolean;
  defaultChecked?: boolean;
  /** Fires when toggled. */
  onChange?: (checked: boolean) => void;
  size?: Size;
  children?: ReactNode;
  className?: string;
};

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { value, checked, defaultChecked, onChange, size, children, className, disabled, ...props },
  ref,
) {
  const group = useContext(CheckboxGroupContext);
  const [ownChecked, setOwnChecked] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange,
  });

  const inGroup = group !== null;
  const isChecked = inGroup ? group.values.includes(value ?? "") : ownChecked;
  const styles = checkboxStyles({ size: size ?? group?.size });

  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      data-value={value}
      disabled={disabled}
      className={className ? `${styles.root} ${className}` : styles.root}
      onClick={() => {
        if (inGroup) {
          if (value != null) group.toggle(value);
        } else {
          setOwnChecked(!ownChecked);
        }
      }}
      {...props}
    >
      <span className={styles.control} data-state={isChecked ? "checked" : "unchecked"}>
        {isChecked ? (
          <svg
            width="65%"
            height="65%"
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
      </span>
      {children}
    </button>
  );
});

/**
 * Multi-select group. Compose with `Checkbox` (also exported standalone):
 *
 *   <CheckboxGroup defaultValue={["a"]} onChange={setValues}>
 *     <Checkbox value="a">Option A</Checkbox>
 *     <Checkbox value="b">Option B</Checkbox>
 *   </CheckboxGroup>
 */
export const CheckboxGroup = Object.assign(CheckboxGroupRoot, { Item: Checkbox });
