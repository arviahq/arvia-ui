import type { ReactNode } from "react";
import { Link as RouterLink, useRouterState } from "@tanstack/react-router";
import { Heading, Link, Stack, Text } from "@arviahq/ui-react";
import { DocsLayout } from "../site.arv";
import { DOC_NAV } from "../docs/registry";

export function DocsShell(props: { activeSlug: string; children: ReactNode }) {
  const layout = DocsLayout();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className={layout.root}>
      <aside className={layout.sidebar}>
        <Stack gap="5">
          {DOC_NAV.map((section) => (
            <Stack key={section.title} gap="2">
              <Text
                size="xs"
                weight="semibold"
                tone="subtle"
                style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
              >
                {section.title}
              </Text>
              <Stack gap="1">
                {section.items.map((item) => {
                  const href = `/docs/${item.slug}`;
                  const isActive = pathname === href || props.activeSlug === item.slug;
                  return (
                    <RouterLink key={item.slug} to="/docs/$slug" params={{ slug: item.slug }}>
                      <Link as="span" tone={isActive ? "primary" : "muted"} size="sm">
                        {item.title}
                      </Link>
                    </RouterLink>
                  );
                })}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </aside>
      <article className={layout.content}>{props.children}</article>
    </div>
  );
}

export function DocHeader(props: { title: string; description: string }) {
  return (
    <Stack gap="2" style={{ marginBottom: 32 }}>
      <Heading level="1">{props.title}</Heading>
      <Text size="lg" tone="muted">
        {props.description}
      </Text>
    </Stack>
  );
}
