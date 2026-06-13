import { Link as RouterLink, useRouterState } from "@tanstack/react-router";
import { Button, Link, Stack, Text } from "@arviahq/ui-react";
import { SiteHeader } from "../site.arv";

export function SiteNav(props: { theme: "light" | "dark"; onThemeToggle: () => void }) {
  const header = SiteHeader();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function linkTone(slug: string): "primary" | "muted" {
    return pathname === `/docs/${slug}` ? "primary" : "muted";
  }

  return (
    <header className={header.root}>
      <div className={header.inner}>
        <RouterLink to="/" style={{ textDecoration: "none" }}>
          <Stack direction="row" gap="2" align="center">
            <img src="/logo.svg" alt="" width={28} height={28} aria-hidden />
            <Text weight="semibold" size="md">
              arvia-ui
            </Text>
          </Stack>
        </RouterLink>

        <Stack direction="row" gap="4" align="center" as="nav">
          <RouterLink to="/docs/$slug" params={{ slug: "introduction" }}>
            <Link as="span" tone={linkTone("introduction")} size="sm">
              Docs
            </Link>
          </RouterLink>
          <RouterLink to="/docs/$slug" params={{ slug: "components" }}>
            <Link as="span" tone={linkTone("components")} size="sm">
              Components
            </Link>
          </RouterLink>
          <a href="https://github.com/arviahq/arvia-ui" target="_blank" rel="noreferrer">
            <Link href="https://github.com/arviahq/arvia-ui" tone="muted" size="sm">
              GitHub
            </Link>
          </a>
        </Stack>

        <Stack direction="row" gap="2" align="center">
          <Button tone="ghost" size="sm" onClick={props.onThemeToggle} aria-label="Toggle theme">
            {props.theme === "dark" ? "☀" : "☾"}
          </Button>
          <RouterLink to="/docs/$slug" params={{ slug: "getting-started" }}>
            <Button size="sm">Install</Button>
          </RouterLink>
        </Stack>
      </div>
    </header>
  );
}
