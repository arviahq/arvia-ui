import { Link as RouterLink } from "@tanstack/react-router";
import { Divider, Link, Stack, Text } from "@arviahq/ui-react";
import { SitePage } from "../site.arv";

export function SiteFooter() {
  const page = SitePage();

  return (
    <footer style={{ borderTop: "1px solid var(--arvia-color-border, #e7e5e4)", marginTop: 48 }}>
      <div className={page.root} style={{ paddingTop: 32, paddingBottom: 32 }}>
        <Stack gap="4">
          <Stack direction="row" gap="4" wrap="yes" justify="between" align="start">
            <Stack gap="2">
              <Text weight="semibold">arvia-ui</Text>
              <Text size="sm" tone="muted">
                Crafted components on Arvia.
              </Text>
            </Stack>
            <Stack direction="row" gap="5">
              <Stack gap="2">
                <Text size="sm" weight="medium">
                  Docs
                </Text>
                <RouterLink to="/docs/$slug" params={{ slug: "introduction" }}>
                  <Link as="span" tone="muted" size="sm">
                    Introduction
                  </Link>
                </RouterLink>
                <RouterLink to="/docs/$slug" params={{ slug: "getting-started" }}>
                  <Link as="span" tone="muted" size="sm">
                    Getting started
                  </Link>
                </RouterLink>
              </Stack>
              <Stack gap="2">
                <Text size="sm" weight="medium">
                  Ecosystem
                </Text>
                <a href="https://github.com/arviahq/arvia" target="_blank" rel="noreferrer">
                  <Link href="https://github.com/arviahq/arvia" tone="muted" size="sm">
                    Arvia compiler
                  </Link>
                </a>
                <a href="https://github.com/arviahq/arvia-ui" target="_blank" rel="noreferrer">
                  <Link href="https://github.com/arviahq/arvia-ui" tone="muted" size="sm">
                    GitHub
                  </Link>
                </a>
              </Stack>
            </Stack>
          </Stack>
          <Divider spacing="sm" />
          <Text size="sm" tone="subtle">
            MIT License · Built with Arvia
          </Text>
        </Stack>
      </div>
    </footer>
  );
}
