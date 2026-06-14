/** Canonical token values from @arvia-ui/core-styles theme.arv (default package theme). */

export type ColorTokenDef = {
  name: string;
  light: string;
  dark: string;
  description?: string;
};

export type ScaleTokenDef = {
  name: string;
  value: string;
};

export type ShadowTokenDef = {
  name: string;
  light: string;
  dark: string;
};

export type SimpleTokenDef = {
  name: string;
  value: string;
};

export const COLOR_TOKENS: ColorTokenDef[] = [
  {
    name: "primary",
    light: "#0f766e",
    dark: "#2dd4bf",
    description: "Brand primary — actions and emphasis",
  },
  { name: "primaryHover", light: "#0d9488", dark: "#5eead4" },
  { name: "primarySubtle", light: "#ccfbf1", dark: "#134e4a" },
  { name: "accent", light: "#d97706", dark: "#d97706", description: "Secondary accent" },
  { name: "danger", light: "#dc2626", dark: "#dc2626", description: "Destructive actions" },
  { name: "dangerHover", light: "#b91c1c", dark: "#b91c1c" },
  { name: "dangerSubtle", light: "#fee2e2", dark: "#450a0a" },
  { name: "success", light: "#16a34a", dark: "#16a34a", description: "Positive feedback" },
  { name: "successSubtle", light: "#dcfce7", dark: "#14532d" },
  { name: "warning", light: "#ca8a04", dark: "#ca8a04", description: "Caution states" },
  { name: "warningSubtle", light: "#fef9c3", dark: "#422006" },
  { name: "text", light: "#1c1917", dark: "#fafaf9" },
  { name: "muted", light: "#78716c", dark: "#a8a29e" },
  { name: "subtle", light: "#a8a29e", dark: "#78716c" },
  { name: "surface", light: "#ffffff", dark: "#1c1917" },
  { name: "surfaceRaised", light: "#fafaf9", dark: "#292524" },
  { name: "background", light: "#f5f5f4", dark: "#0c0a09" },
  { name: "border", light: "#e7e5e4", dark: "#292524" },
  { name: "borderStrong", light: "#d6d3d1", dark: "#44403c" },
  { name: "focus", light: "#0f766e", dark: "#2dd4bf" },
];

export const SPACE_TOKENS: ScaleTokenDef[] = [
  { name: "1", value: "4px" },
  { name: "2", value: "8px" },
  { name: "3", value: "12px" },
  { name: "4", value: "16px" },
  { name: "5", value: "20px" },
  { name: "6", value: "24px" },
  { name: "7", value: "32px" },
  { name: "8", value: "40px" },
  { name: "9", value: "48px" },
];

export const RADIUS_TOKENS: ScaleTokenDef[] = [
  { name: "sm", value: "6px" },
  { name: "md", value: "8px" },
  { name: "lg", value: "12px" },
  { name: "xl", value: "16px" },
  { name: "full", value: "999px" },
];

export const FONT_TOKENS: ScaleTokenDef[] = [
  { name: "xs", value: "12px" },
  { name: "sm", value: "14px" },
  { name: "md", value: "16px" },
  { name: "lg", value: "18px" },
  { name: "xl", value: "20px" },
  { name: "2xl", value: "24px" },
  { name: "3xl", value: "30px" },
  { name: "4xl", value: "36px" },
];

export const SHADOW_TOKENS: ShadowTokenDef[] = [
  {
    name: "sm",
    light: "0 1px 2px rgba(28, 25, 23, 0.05)",
    dark: "0 1px 2px rgba(0, 0, 0, 0.45)",
  },
  {
    name: "md",
    light: "0 4px 12px rgba(28, 25, 23, 0.08)",
    dark: "0 6px 16px rgba(0, 0, 0, 0.55)",
  },
  {
    name: "lg",
    light: "0 8px 24px rgba(28, 25, 23, 0.12)",
    dark: "0 12px 32px rgba(0, 0, 0, 0.65)",
  },
];

export const DURATION_TOKENS: SimpleTokenDef[] = [
  { name: "fast", value: "120ms" },
  { name: "normal", value: "200ms" },
  { name: "slow", value: "320ms" },
];

export const EASING_TOKENS: SimpleTokenDef[] = [
  { name: "default", value: "ease" },
  { name: "out", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
];

export function cssVar(category: string, name: string): string {
  return `--arvia-${category}-${name}`;
}
