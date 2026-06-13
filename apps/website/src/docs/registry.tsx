import type { ComponentType } from "react";
import { ComponentDocPage } from "../components/ComponentDocPage";
import { COMPONENT_DOCS } from "./components/catalog";
import { IntroductionPage, introductionMeta } from "./pages/introduction";
import { GettingStartedPage, gettingStartedMeta } from "./pages/getting-started";
import { ThemingPage, themingMeta } from "./pages/theming";
import { ComponentsPage, componentsMeta } from "./pages/components";

export type DocSlug = string;

export type DocPageMeta = {
  slug: DocSlug;
  title: string;
  description: string;
};

export type DocEntry = {
  meta: DocPageMeta;
  Page: ComponentType;
};

const componentPages: DocEntry[] = COMPONENT_DOCS.map((doc) => ({
  meta: {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
  },
  Page: () => <ComponentDocPage doc={doc} />,
}));

export const DOC_PAGES: DocEntry[] = [
  { meta: introductionMeta, Page: IntroductionPage },
  { meta: gettingStartedMeta, Page: GettingStartedPage },
  { meta: themingMeta, Page: ThemingPage },
  { meta: componentsMeta, Page: ComponentsPage },
  ...componentPages,
];

export const docBySlug = Object.fromEntries(
  DOC_PAGES.map((entry) => [entry.meta.slug, entry]),
) as Record<DocSlug, DocEntry>;

export const DOC_NAV: { title: string; items: { slug: DocSlug; title: string }[] }[] = [
  {
    title: "Start",
    items: [
      { slug: "introduction", title: "Introduction" },
      { slug: "getting-started", title: "Getting started" },
    ],
  },
  {
    title: "Guides",
    items: [{ slug: "theming", title: "Theming" }],
  },
  {
    title: "Components",
    items: [
      { slug: "components", title: "Overview" },
      ...COMPONENT_DOCS.map((doc) => ({ slug: doc.slug, title: doc.title })),
    ],
  },
];
