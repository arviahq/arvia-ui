import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  ColorPicker as colorPickerStyles,
  type ColorPickerProps as ArviaColorPickerProps,
} from "@arvia-ui/core-styles/components/color-picker.arv";
import { IconButton } from "./IconButton";
import { Input } from "./Input";
import { Popover } from "./Popover";
import {
  clamp,
  DEFAULT_COLOR,
  hexFromHsv,
  hexToHsl,
  hexToHsv,
  hexToRgb,
  hslToHex,
  normalizeHex,
  rgbToHex,
  type Hsl,
  type Hsv,
} from "./colorUtils";
import { useControllableState } from "./utils";

export { normalizeHex } from "./colorUtils";

type ColorFormat = "rgb" | "hex" | "hsl";

const FORMATS: ColorFormat[] = ["rgb", "hex", "hsl"];

function EyedropperIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M224.49 51.51a12 12 0 0 0-17-17L154 88l-10-10a20 20 0 0 0-28.28 0l-84 84a20 20 0 0 0 0 28.28l10 10L19.51 216.49a12 12 0 0 0 17 17l46.49-46.49 10 10a20 20 0 0 0 28.28 0l84-84a20 20 0 0 0 0-28.28l-10-10Zm-111.49 143.49L61 143l51-51 52 52Z" />
    </svg>
  );
}

function FormatToggleIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m18 15-6-6-6 6" />
      <path d="m18 9-6-6-6 6" />
    </svg>
  );
}

type ColorPickerPanelProps = {
  color: string;
  onChange: (color: string) => void;
  disabled?: boolean;
  styles: ReturnType<typeof colorPickerStyles>;
};

function ColorPickerPanel({ color, onChange, disabled, styles }: ColorPickerPanelProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const [format, setFormat] = useState<ColorFormat>("rgb");
  const canEyeDrop = typeof window !== "undefined" && "EyeDropper" in window;

  const hsv = hexToHsv(color) ?? hexToHsv(DEFAULT_COLOR)!;
  const rgb = hexToRgb(color) ?? hexToRgb(DEFAULT_COLOR)!;
  const hsl = hexToHsl(color) ?? hexToHsl(DEFAULT_COLOR)!;

  function commitHex(next: string) {
    const normalized = normalizeHex(next);
    if (normalized) onChange(normalized);
  }

  function updateHsv(patch: Partial<Hsv>) {
    commitHex(
      hexFromHsv({
        h: patch.h ?? hsv.h,
        s: patch.s ?? hsv.s,
        v: patch.v ?? hsv.v,
      }),
    );
  }

  function setFromField(clientX: number, clientY: number) {
    const el = fieldRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clamp((clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((clientY - rect.top) / rect.height, 0, 1);
    updateHsv({ s: x * 100, v: (1 - y) * 100 });
  }

  function setFromHue(clientX: number) {
    const el = hueRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clamp((clientX - rect.left) / rect.width, 0, 1);
    updateHsv({ h: x * 360 });
  }

  function onFieldPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromField(event.clientX, event.clientY);
  }

  function onFieldPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    setFromField(event.clientX, event.clientY);
  }

  function onHuePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromHue(event.clientX);
  }

  function onHuePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    setFromHue(event.clientX);
  }

  function onHueKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
    let next = hsv.h;
    if (event.key === "ArrowRight") next += 1;
    else if (event.key === "ArrowLeft") next -= 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 360;
    else return;
    event.preventDefault();
    updateHsv({ h: clamp(next, 0, 360) });
  }

  async function pickFromScreen() {
    if (!canEyeDrop || disabled) return;
    try {
      const EyeDropper = (
        window as unknown as { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }
      ).EyeDropper;
      const dropper = new EyeDropper();
      const result = await dropper.open();
      commitHex(result.sRGBHex);
    } catch {
      // User cancelled the eyedropper.
    }
  }

  function cycleFormat() {
    const index = FORMATS.indexOf(format);
    setFormat(FORMATS[(index + 1) % FORMATS.length]!);
  }

  function setRgbChannel(channel: "r" | "g" | "b", raw: string) {
    const parsed = Number.parseInt(raw, 10);
    if (Number.isNaN(parsed)) return;
    commitHex(rgbToHex({ ...rgb, [channel]: clamp(parsed, 0, 255) }));
  }

  function setHslChannel(channel: "h" | "s" | "l", raw: string) {
    const parsed = Number.parseInt(raw, 10);
    if (Number.isNaN(parsed)) return;
    const next: Hsl = { ...hsl };
    if (channel === "h") next.h = clamp(parsed, 0, 360);
    else next[channel] = clamp(parsed, 0, 100);
    commitHex(hslToHex(next));
  }

  const fieldBackground = {
    background: `
      linear-gradient(to top, rgb(0 0 0), transparent),
      linear-gradient(to right, rgb(255 255 255), transparent),
      hsl(${hsv.h} 100% 50%)
    `,
  };

  return (
    <>
      <div
        ref={fieldRef}
        className={styles.field}
        style={fieldBackground}
        onPointerDown={onFieldPointerDown}
        onPointerMove={onFieldPointerMove}
        role="presentation"
      >
        <span
          className={styles.fieldThumb}
          style={{
            left: `${hsv.s}%`,
            top: `${100 - hsv.v}%`,
            backgroundColor: color,
          }}
        />
      </div>

      <div className={styles.controls}>
        <IconButton
          tone="ghost"
          size="sm"
          aria-label="Pick color from screen"
          disabled={disabled || !canEyeDrop}
          onClick={pickFromScreen}
        >
          <EyedropperIcon />
        </IconButton>
        <span className={styles.preview} style={{ backgroundColor: color }} aria-hidden />
        <div
          ref={hueRef}
          className={styles.hue}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={Math.round(hsv.h)}
          aria-label="Hue"
          onPointerDown={onHuePointerDown}
          onPointerMove={onHuePointerMove}
          onKeyDown={onHueKeyDown}
        >
          <span
            className={styles.hueThumb}
            style={{ left: `${(hsv.h / 360) * 100}%`, backgroundColor: color }}
          />
        </div>
      </div>

      <div className={styles.inputs}>
        <div className={styles.channels}>
          {format === "rgb"
            ? (["r", "g", "b"] as const).map((channel) => (
                <label key={channel} className={styles.channel}>
                  <Input
                    size="sm"
                    type="number"
                    min={0}
                    max={255}
                    value={String(rgb[channel])}
                    disabled={disabled}
                    aria-label={channel.toUpperCase()}
                    style={{ textAlign: "center", paddingInline: 8 }}
                    onChange={(event) => setRgbChannel(channel, event.target.value)}
                  />
                  <span className={styles.channelLabel}>{channel.toUpperCase()}</span>
                </label>
              ))
            : format === "hsl"
              ? (["h", "s", "l"] as const).map((channel) => (
                  <label key={channel} className={styles.channel}>
                    <Input
                      size="sm"
                      type="number"
                      min={0}
                      max={channel === "h" ? 360 : 100}
                      value={String(Math.round(hsl[channel]))}
                      disabled={disabled}
                      aria-label={channel.toUpperCase()}
                      style={{ textAlign: "center", paddingInline: 8 }}
                      onChange={(event) => setHslChannel(channel, event.target.value)}
                    />
                    <span className={styles.channelLabel}>{channel.toUpperCase()}</span>
                  </label>
                ))
              : (
                <label className={styles.channel} style={{ flex: 3 }}>
                  <Input
                    size="sm"
                    type="text"
                    value={color}
                    disabled={disabled}
                    spellCheck={false}
                    aria-label="Hex"
                    style={{
                      textAlign: "center",
                      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                    }}
                    onChange={(event) => {
                      const normalized = normalizeHex(event.target.value);
                      if (normalized) commitHex(normalized);
                    }}
                  />
                  <span className={styles.channelLabel}>Hex</span>
                </label>
              )}
        </div>
        <button
          type="button"
          className={styles.formatToggle}
          disabled={disabled}
          aria-label={`Color format: ${format.toUpperCase()}. Click to change.`}
          onClick={cycleFormat}
        >
          <FormatToggleIcon />
        </button>
      </div>
    </>
  );
}

export type ColorPickerProps = ArviaColorPickerProps &
  Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> & {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
    "aria-label"?: string;
    "aria-invalid"?: boolean | "true" | "false";
    className?: string;
  };

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(function ColorPicker(
  {
    value,
    defaultValue,
    onChange,
    disabled,
    placeholder = "#000000",
    size,
    className,
    "aria-label": ariaLabel = "Color",
    "aria-invalid": ariaInvalid,
    ...props
  },
  ref,
) {
  const styles = colorPickerStyles({ size });
  const [open, setOpen] = useState(false);
  const [committed, setCommitted] = useControllableState({
    value,
    defaultValue: defaultValue ?? DEFAULT_COLOR,
    onChange,
  });
  const [hexDraft, setHexDraft] = useState(committed);

  useEffect(() => {
    setHexDraft(committed);
  }, [committed]);

  const displayColor = normalizeHex(hexDraft) ?? normalizeHex(committed) ?? DEFAULT_COLOR;
  const invalid = ariaInvalid === true || ariaInvalid === "true";

  function commitHex(next: string) {
    const normalized = normalizeHex(next);
    if (!normalized) return;
    setCommitted(normalized);
    setHexDraft(normalized);
  }

  function onHexChange(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.value;
    setHexDraft(next);
    const normalized = normalizeHex(next);
    if (normalized) setCommitted(normalized);
  }

  function onHexBlur() {
    const normalized = normalizeHex(hexDraft);
    if (normalized) {
      setHexDraft(normalized);
      setCommitted(normalized);
      return;
    }
    setHexDraft(committed);
  }

  return (
    <div
      ref={ref}
      className={className ? `${styles.root} ${className}` : styles.root}
      role="group"
      aria-label={ariaLabel}
      {...props}
    >
      <Popover open={disabled ? false : open} onChange={disabled ? undefined : setOpen}>
        <Popover.Trigger>
          <button
            type="button"
            className={styles.trigger}
            style={{ backgroundColor: displayColor }}
            disabled={disabled}
            aria-label={`${ariaLabel} picker`}
          />
        </Popover.Trigger>
        <Popover.Content className={styles.panel} style={{ maxWidth: "none" }}>
          <ColorPickerPanel
            color={displayColor}
            disabled={disabled}
            styles={styles}
            onChange={commitHex}
          />
        </Popover.Content>
      </Popover>
      <Input
        type="text"
        size={size}
        value={hexDraft}
        disabled={disabled}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        aria-label={`${ariaLabel} hex value`}
        aria-invalid={invalid || undefined}
        style={{ flex: 1, minWidth: 0, fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
        onChange={onHexChange}
        onBlur={onHexBlur}
      />
    </div>
  );
});
