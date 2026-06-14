import type { ReactNode } from "react";
import { Heading, Stack, Text } from "@arvia-ui/react";
import { DocsLayout } from "../site.arv";
import { DocsNavLinks } from "./DocsNavLinks";

export function DocsShell(props: { activeSlug: string; children: ReactNode }) {
  const layout = DocsLayout();

  return (
    <div className={layout.root}>
      <aside className={layout.sidebar}>
        <DocsNavLinks activeSlug={props.activeSlug} />
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
