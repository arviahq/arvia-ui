import { Link as RouterLink } from "@tanstack/react-router";
import { Card, Heading, Stack, Text } from "@arviahq/ui-react";
import { DocHeader } from "../../components/DocsShell";
import { DocP, DocProse } from "../../components/DocProse";
import { COMPONENT_DOCS } from "../components/catalog";
import type { DocPageMeta } from "../registry";

export const componentsMeta: DocPageMeta = {
  slug: "components",
  title: "Components",
  description: "Browse every v0.1 component with live previews and full prop reference.",
};

export function ComponentsPage() {
  return (
    <DocProse>
      <DocHeader {...componentsMeta} />
      <DocP>
        Each component has a dedicated page with a live preview, variant examples, and a complete props table.
        All components are imported from <code>@arviahq/ui-react</code>.
      </DocP>

      <Stack gap="3" style={{ marginTop: 24 }}>
        {COMPONENT_DOCS.map((doc) => (
          <RouterLink
            key={doc.slug}
            to="/docs/$slug"
            params={{ slug: doc.slug }}
            style={{ textDecoration: "none" }}
          >
            <Card padding="md" shadow="sm">
              <Stack gap="1">
                <Heading level="4">{doc.title}</Heading>
                <Text size="sm" tone="muted">
                  {doc.description}
                </Text>
              </Stack>
            </Card>
          </RouterLink>
        ))}
      </Stack>
    </DocProse>
  );
}
