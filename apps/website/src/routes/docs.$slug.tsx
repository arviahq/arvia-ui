import { createFileRoute, Navigate } from "@tanstack/react-router";
import { DocsShell } from "../components/DocsShell";
import { docBySlug } from "../docs/registry";
import { usePageMeta } from "../page-meta";

export const Route = createFileRoute("/docs/$slug")({
  component: DocRoute,
});

function DocRoute() {
  const { slug } = Route.useParams();
  const entry = docBySlug[slug];

  usePageMeta(entry?.meta.title, entry?.meta.description);

  if (!entry) {
    return <Navigate to="/docs/$slug" params={{ slug: "introduction" }} replace />;
  }

  const Page = entry.Page;
  return (
    <DocsShell activeSlug={slug}>
      <Page />
    </DocsShell>
  );
}
