import {
  Children,
  isValidElement,
  useEffect,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { Select as selectStyles } from "@arvia-ui/core-styles/components/select.arv";
import {
  Portal,
  useAnchoredPosition,
  useControllableState,
  useId,
  useOnClickOutside,
  useOnEscape,
} from "./utils";

export type SelectOptionProps = {
  value: string;
  children?: ReactNode;
  disabled?: boolean;
};

/** Config-only — Select reads its props; it renders nothing itself. */
function SelectOption(_props: SelectOptionProps) {
  return null;
}

type OptionData = { value: string; label: ReactNode; disabled?: boolean };

function extractOptions(children: ReactNode): OptionData[] {
  const out: OptionData[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement<SelectOptionProps>(child)) {
      out.push({
        value: child.props.value,
        label: child.props.children,
        disabled: child.props.disabled,
      });
    }
  });
  return out;
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function Check() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export type SelectProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Render a styled native <select> instead of the custom listbox. */
  native?: boolean;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  children?: ReactNode;
  className?: string;
  "aria-label"?: string;
  id?: string;
};

function SelectRoot({
  value,
  defaultValue,
  onChange,
  native,
  placeholder,
  disabled,
  name,
  children,
  className,
  "aria-label": ariaLabel,
  id,
}: SelectProps) {
  const styles = selectStyles();
  const baseId = useId(id);
  const [val, setVal] = useControllableState({ value, defaultValue: defaultValue ?? "", onChange });
  const options = extractOptions(children);
  const selected = options.find((option) => option.value === val);

  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const { anchorRef, floatingRef, style } = useAnchoredPosition<HTMLButtonElement, HTMLDivElement>(
    open,
    {
      gap: 4,
      matchWidth: true,
    },
  );

  useOnEscape(open && !native, () => {
    setOpen(false);
    anchorRef.current?.focus();
  });
  useOnClickOutside(open && !native, () => setOpen(false), [anchorRef, floatingRef]);

  useEffect(() => {
    if (!open) return;
    const index = options.findIndex((option) => option.value === val);
    setHighlight(index >= 0 ? index : options.findIndex((option) => !option.disabled));
    floatingRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (native) {
    return (
      <select
        id={baseId}
        name={name}
        value={val}
        disabled={disabled}
        aria-label={ariaLabel}
        className={className ? `${styles.native} ${className}` : styles.native}
        onChange={(event) => setVal(event.target.value)}
      >
        {placeholder !== undefined ? (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  function step(from: number, dir: number): number {
    const n = options.length;
    if (n === 0) return from;
    let i = from;
    for (let k = 0; k < n; k++) {
      i = (i + dir + n) % n;
      if (!options[i]?.disabled) return i;
    }
    return from;
  }

  function commit(optionValue: string) {
    setVal(optionValue);
    setOpen(false);
    anchorRef.current?.focus();
  }

  function onListKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlight((h) => step(h, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((h) => step(h, -1));
    } else if (event.key === "Home") {
      event.preventDefault();
      setHighlight(step(-1, 1));
    } else if (event.key === "End") {
      event.preventDefault();
      setHighlight(step(0, -1));
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const option = options[highlight];
      if (option && !option.disabled) commit(option.value);
    }
  }

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        id={baseId}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        data-placeholder={selected ? undefined : true}
        className={className ? `${styles.trigger} ${className}` : styles.trigger}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span>{selected ? selected.label : (placeholder ?? "Select…")}</span>
        <Chevron className={styles.icon} />
      </button>
      {open ? (
        <Portal>
          <div
            ref={floatingRef}
            role="listbox"
            tabIndex={-1}
            className={styles.content}
            style={style}
            onKeyDown={onListKeyDown}
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                role="option"
                aria-selected={option.value === val}
                aria-disabled={option.disabled || undefined}
                data-selected={option.value === val || undefined}
                data-highlighted={index === highlight || undefined}
                className={styles.option}
                onMouseEnter={() => setHighlight(index)}
                onClick={() => {
                  if (!option.disabled) commit(option.value);
                }}
              >
                <span>{option.label}</span>
                {option.value === val ? <Check /> : null}
              </div>
            ))}
          </div>
        </Portal>
      ) : null}
    </>
  );
}

/**
 * Select with a custom listbox, or a styled native control via `native`:
 *
 *   <Select defaultValue="a" placeholder="Pick one">
 *     <Select.Option value="a">Apple</Select.Option>
 *     <Select.Option value="b">Banana</Select.Option>
 *   </Select>
 */
export const Select = Object.assign(SelectRoot, { Option: SelectOption });
