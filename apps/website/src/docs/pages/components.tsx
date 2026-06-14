import { Link as RouterLink } from "@tanstack/react-router";
import { DocHeader } from "../../components/DocsShell";
import { DocP, DocProse } from "../../components/DocProse";
import { ComponentCard, ComponentGallery } from "../../site.arv";
import { COMPONENT_DOCS } from "../components/catalog";
import type { DocPageMeta } from "../registry";

export const componentsMeta: DocPageMeta = {
  slug: "components",
  title: "Components",
  description: "Browse every v0.1 component with live previews and a full prop reference.",
};

export function ComponentsPage() {
  const gallery = ComponentGallery();

  return (
    <DocProse>
      <DocHeader {...componentsMeta} />
      <DocP>
        Each card is a live, themed render — switch the site theme to see every component follow.
        All components are imported from <code>@arvia-ui/react</code>; click through for variant
        examples and a complete props table.
      </DocP>

      <div className={gallery.root}>
        {COMPONENT_DOCS.map((doc) => {
          const card = ComponentCard();
          const Preview = doc.Preview;
          return (
            <RouterLink
              key={doc.slug}
              to="/docs/$slug"
              params={{ slug: doc.slug }}
              className={card.root}
            >
              <div className={card.preview}>
                <Preview />
              </div>
              <div className={card.info}>
                <h3 className={card.title}>{doc.title}</h3>
                <p className={card.desc}>{doc.description}</p>
                <span className={card.more}>View component →</span>
              </div>
            </RouterLink>
          );
        })}
      </div>
    </DocProse>
  );
}
