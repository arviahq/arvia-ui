import {
  createContext,
  forwardRef,
  useContext,
  type ButtonHTMLAttributes,
  type FocusEvent as ReactFocusEvent,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { Radio as radioStyles } from "@arvia-ui/core-styles/components/radio.arv";
import { RadioGroup as radioGroupStyles } from "@arvia-ui/core-styles/components/radiogroup.arv";
import { useControllableState } from "./utils";

type Size = "sm" | "md" | "lg";

type RadioGroupContextValue = {
  value: string;
  setValue: (value: string) => void;
  size?: Size;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export type RadioGroupProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: Size;
  children?: ReactNode;
  className?: string;
};

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { value, defaultValue, onChange, size, children, className, ...props },
  ref,
) {
  const styles = radioGroupStyles();
  const [val, setVal] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange,
  });

  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
    const radios = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]:not([disabled])'),
    );
    const index = radios.findIndex((radio) => radio === document.activeElement);
    if (index === -1) return;
    event.preventDefault();
    const dir = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = radios[(index + dir + radios.length) % radios.length];
    if (!next) return;
    next.focus();
    const nextValue = next.getAttribute("data-value");
    if (nextValue != null) setVal(nextValue);
  }

  function onFocus(event: ReactFocusEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    event.currentTarget.querySelector<HTMLButtonElement>('[role="radio"]:not([disabled])')?.focus();
  }

  return (
    <RadioGroupContext.Provider value={{ value: val, setValue: setVal, size }}>
      <div
        ref={ref}
        role="radiogroup"
        tabIndex={val ? -1 : 0}
        className={className ? `${styles.root} ${className}` : styles.root}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});

export type RadioProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> & {
  /** Value selected within a RadioGroup. */
  value?: string;
  /** Checked state when used standalone (controlled). */
  checked?: boolean;
  defaultChecked?: boolean;
  /** Fires when toggled standalone. Within a RadioGroup, use the group's onChange. */
  onChange?: (checked: boolean) => void;
  size?: Size;
  children?: ReactNode;
  className?: string;
};

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(function Radio(
  { value, checked, defaultChecked, onChange, size, children, className, disabled, ...props },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const [ownChecked, setOwnChecked] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange,
  });

  const inGroup = group !== null;
  const isChecked = inGroup ? group.value === value : ownChecked;
  const styles = radioStyles({ size: size ?? group?.size });
  const state = isChecked ? "checked" : "unchecked";

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={isChecked}
      data-value={value}
      tabIndex={inGroup ? (isChecked ? 0 : -1) : 0}
      disabled={disabled}
      className={className ? `${styles.root} ${className}` : styles.root}
      onClick={() => {
        if (inGroup) {
          if (value != null) group.setValue(value);
        } else {
          setOwnChecked(true);
        }
      }}
      {...props}
    >
      <span className={styles.control} data-state={state}>
        <span className={styles.dot} data-state={state} />
      </span>
      {children}
    </button>
  );
});

/**
 * Single-select group. Compose with `Radio` (also exported standalone):
 *
 *   <RadioGroup defaultValue="a" onChange={setV}>
 *     <Radio value="a">Option A</Radio>
 *     <Radio value="b">Option B</Radio>
 *   </RadioGroup>
 */
export const RadioGroup = Object.assign(RadioGroupRoot, { Item: Radio });
