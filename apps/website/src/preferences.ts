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
