import type { ReactNode } from "react";
import { Link as RouterLink, useRouterState } from "@tanstack/react-router";
import { Heading, Stack, Text } from "@arvia-ui/react";
import { DocsLayout, DocsNav } from "../site.arv";
import { DOC_NAV } from "../docs/registry";

export function DocsShell(props: { activeSlug: string; children: ReactNode }) {
  const layout = DocsLayout();
  const nav = DocsNav();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className={layout.root}>
      <aside className={layout.sidebar}>
        <nav className={nav.root}>
          {DOC_NAV.map((section) => (
            <div key={section.title} className={nav.section}>
              <p className={nav.sectionTitle}>{section.title}</p>
              <div className={nav.list}>
                {section.items.map((item) => {
                  const href = `/docs/${item.slug}`;
                  const isActive = pathname === href || props.activeSlug === item.slug;
                  return (
                    <RouterLink
                      key={item.slug}
                      to="/docs/$slug"
                      params={{ slug: item.slug }}
                      className={nav.link}
                      data-active={isActive}
                    >
                      {item.title}
                    </RouterLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
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
