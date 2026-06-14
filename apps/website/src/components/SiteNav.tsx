import { useEffect, useState } from "react";
import { Link as RouterLink, useRouterState } from "@tanstack/react-router";
import { Button, Drawer, IconButton } from "@arvia-ui/react";
import { SiteHeader } from "../site.arv";
import { DocsNavPanel } from "./DocsNavPanel";

function MenuIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function SiteNav(props: { theme: "light" | "dark"; onThemeToggle: () => void }) {
  const header = SiteHeader();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [navOpen, setNavOpen] = useState(false);

  const isDocs = pathname.startsWith("/docs");
  const activeSlug = isDocs ? pathname.replace(/^\/docs\/?/, "").split("/")[0] : "";
  const isActive = (slug: string) => pathname === `/docs/${slug}`;

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  const brandText = <span className={header.brandText}>arvia-ui</span>;

  return (
    <header className={header.root}>
      <div className={header.inner}>
        {isDocs ? (
          <div className={header.brand}>
            <span className={header.menuButton}>
              <Drawer open={navOpen} onChange={setNavOpen} side="left">
                <Drawer.Trigger>
                  <IconButton tone="ghost" size="sm" aria-label="Open docs navigation">
                    <MenuIcon />
                  </IconButton>
                </Drawer.Trigger>
                <Drawer.Content>
                  <Drawer.Close />
                  <Drawer.Header>
                    <Drawer.Title>Documentation</Drawer.Title>
                  </Drawer.Header>
                  <DocsNavPanel activeSlug={activeSlug} onNavigate={() => setNavOpen(false)} />
                </Drawer.Content>
              </Drawer>
            </span>
            <RouterLink to="/" className={header.brandMarkDocs} aria-label="Home">
              <img src="/logo.svg" alt="" width={28} height={28} aria-hidden />
            </RouterLink>
            <RouterLink to="/" className={header.brandTextLink}>
              {brandText}
            </RouterLink>
          </div>
        ) : (
          <RouterLink to="/" className={header.brand}>
            <span className={header.brandMark}>
              <img src="/logo.svg" alt="" width={28} height={28} aria-hidden />
            </span>
            {brandText}
          </RouterLink>
        )}

        <nav className={header.links}>
          <RouterLink
            to="/docs/$slug"
            params={{ slug: "introduction" }}
            className={header.link}
            data-active={isActive("introduction")}
          >
            Docs
          </RouterLink>
          <RouterLink
            to="/docs/$slug"
            params={{ slug: "components" }}
            className={header.link}
            data-active={isActive("components")}
          >
            Components
          </RouterLink>
          <a
            href="https://github.com/arviahq/arvia-ui"
            className={header.link}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>

        <div className={header.actions}>
          <Button
            tone="ghost"
            size="sm"
            onClick={props.onThemeToggle}
            aria-label={props.theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {props.theme === "dark" ? "☀" : "☾"}
          </Button>
        </div>
      </div>
    </header>
  );
}
