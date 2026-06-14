export type SiteTheme = "light" | "dark";

const THEME_KEY = "arvia-ui-theme";

export function getStoredTheme(): SiteTheme | null {
  const value = localStorage.getItem(THEME_KEY);
  if (value === "light" || value === "dark") return value;
  return null;
}

export function setStoredTheme(theme: SiteTheme): void {
  localStorage.setItem(THEME_KEY, theme);
}

/** Pick the active Arvia mode by setting `data-arvia-theme` on `<html>`.
 *  Theming is pure native CSS (color-scheme + light-dark()), so this attribute
 *  is all the runtime there is — no library helper needed. */
export function applyTheme(theme: SiteTheme): void {
  document.documentElement.setAttribute("data-arvia-theme", theme);
}
