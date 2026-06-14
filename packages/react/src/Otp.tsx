import {
  forwardRef,
  useCallback,
  useRef,
  type ClipboardEvent,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import {
  Otp as otpStyles,
  type OtpProps as ArviaOtpProps,
} from "@arvia-ui/core-styles/components/otp.arv";
import { useControllableState } from "./utils";

export type OtpProps = ArviaOtpProps &
  Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> & {
    /** OTP string value (controlled). */
    value?: string;
    /** Initial OTP string (uncontrolled). */
    defaultValue?: string;
    /** Called when the value changes. */
    onChange?: (value: string) => void;
    /** Called when every cell is filled. */
    onComplete?: (value: string) => void;
    /** Number of digit cells. */
    length?: number;
    /** Restrict input to digits only. */
    numeric?: boolean;
    /** Disables all cells. */
    disabled?: boolean;
    /** Applies error styling to all cells. */
    invalid?: boolean;
    /** Focus the first cell on mount. */
    autoFocus?: boolean;
    /** Hidden input name for native form submission. */
    name?: string;
    /** Accessible label for the group. */
    "aria-label"?: string;
    className?: string;
  };

function toCells(value: string, length: number): string[] {
  return Array.from({ length }, (_, index) => value[index] ?? "");
}

function fromCells(cells: string[]): string {
  return cells.join("");
}

function isAllowedChar(char: string, numeric: boolean): boolean {
  if (char.length !== 1) return false;
  return numeric ? /\d/.test(char) : true;
}

function filterInput(text: string, numeric: boolean): string {
  return numeric ? text.replace(/\D/g, "") : text;
}

export const Otp = forwardRef<HTMLDivElement, OtpProps>(function Otp(
  {
    value,
    defaultValue,
    onChange,
    onComplete,
    length = 6,
    numeric = true,
    disabled,
    invalid,
    autoFocus,
    name,
    size,
    className,
    "aria-label": ariaLabel = "One-time password",
    ...props
  },
  ref,
) {
  const styles = otpStyles({ size });
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [otp, setOtp] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange,
  });

  const cells = toCells(otp, length);
  const invalidAttr = invalid ? "true" : undefined;

  const focusCell = useCallback((index: number) => {
    const target = inputRefs.current[index];
    target?.focus();
    target?.select();
  }, []);

  const commit = useCallback(
    (nextCells: string[]) => {
      const next = fromCells(nextCells);
      setOtp(next);
      if (next.length === length && nextCells.every(Boolean)) {
        onComplete?.(next);
      }
    },
    [length, onComplete, setOtp],
  );

  const applyText = useCallback(
    (text: string, startIndex: number) => {
      const filtered = filterInput(text, numeric);
      if (!filtered) return;

      const nextCells = [...cells];
      let index = startIndex;

      for (const char of filtered) {
        if (index >= length) break;
        if (!isAllowedChar(char, numeric)) continue;
        nextCells[index] = char;
        index += 1;
      }

      commit(nextCells);
      focusCell(Math.min(index, length - 1));
    },
    [cells, commit, focusCell, length, numeric],
  );

  const updateCell = useCallback(
    (index: number, char: string) => {
      const nextCells = [...cells];
      nextCells[index] = char;
      commit(nextCells);
    },
    [cells, commit],
  );

  return (
    <div
      ref={ref}
      role="group"
      aria-label={ariaLabel}
      className={className ? `${styles.root} ${className}` : styles.root}
      onPaste={(event: ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        const activeIndex = inputRefs.current.findIndex(
          (input) => input === document.activeElement,
        );
        applyText(event.clipboardData.getData("text"), activeIndex >= 0 ? activeIndex : 0);
      }}
      {...props}
    >
      {name ? <input type="hidden" name={name} value={otp} readOnly /> : null}
      {cells.map((char, index) => (
        <input
          key={index}
          ref={(node) => {
            inputRefs.current[index] = node;
          }}
          type="text"
          inputMode={numeric ? "numeric" : "text"}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          autoFocus={autoFocus && index === 0}
          maxLength={1}
          value={char}
          disabled={disabled}
          aria-invalid={invalidAttr}
          aria-label={`Digit ${index + 1} of ${length}`}
          className={styles.cell}
          onChange={(event) => {
            const raw = event.target.value;
            if (raw.length > 1) {
              applyText(raw, index);
              return;
            }

            if (!raw) {
              updateCell(index, "");
              return;
            }

            const nextChar = raw.slice(-1);
            if (!isAllowedChar(nextChar, numeric)) {
              event.target.value = char;
              return;
            }

            updateCell(index, nextChar);
            if (index < length - 1) focusCell(index + 1);
          }}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Backspace") {
              event.preventDefault();
              if (cells[index]) {
                updateCell(index, "");
                return;
              }
              if (index > 0) {
                updateCell(index - 1, "");
                focusCell(index - 1);
              }
              return;
            }

            if (event.key === "ArrowLeft" && index > 0) {
              event.preventDefault();
              focusCell(index - 1);
              return;
            }

            if (event.key === "ArrowRight" && index < length - 1) {
              event.preventDefault();
              focusCell(index + 1);
            }
          }}
          onFocus={(event) => event.currentTarget.select()}
        />
      ))}
    </div>
  );
});
