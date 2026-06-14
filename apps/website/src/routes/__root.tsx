import { useEffect, useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { setTheme, ToastProvider } from "@arvia-ui/react";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { getStoredTheme, setStoredTheme, type SiteTheme } from "../preferences";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const [theme, setThemeState] = useState<SiteTheme>(() => getStoredTheme() ?? "light");

  useEffect(() => {
    setTheme(theme);
    setStoredTheme(theme);
  }, [theme]);

  function toggleTheme() {
    setThemeState((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <ToastProvider>
      <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
        <SiteNav theme={theme} onThemeToggle={toggleTheme} />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </ToastProvider>
  );
}
