import { Link as RouterLink, useRouterState } from "@tanstack/react-router";
import { Button } from "@arviahq/ui-react";
import { SiteHeader } from "../site.arv";

export function SiteNav(props: { theme: "light" | "dark"; onThemeToggle: () => void }) {
  const header = SiteHeader();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (slug: string) => pathname === `/docs/${slug}`;

  return (
    <header className={header.root}>
      <div className={header.inner}>
        <RouterLink to="/" className={header.brand}>
          <img src="/logo.svg" alt="" width={26} height={26} aria-hidden />
          <span className={header.brandText}>arvia-ui</span>
        </RouterLink>

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
          <RouterLink to="/docs/$slug" params={{ slug: "getting-started" }}>
            <Button size="sm">Get started</Button>
          </RouterLink>
        </div>
      </div>
    </header>
  );
}
