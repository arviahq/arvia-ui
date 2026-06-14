import { DOC_NAV, DOC_PAGES } from "./registry";

export type DocSearchItem = {
  slug: string;
  title: string;
  description: string;
  section: string;
};

const DOC_SEARCH_INDEX: DocSearchItem[] = (() => {
  const sectionBySlug = new Map<string, string>();
  for (const section of DOC_NAV) {
    for (const item of section.items) {
      sectionBySlug.set(item.slug, section.title);
    }
  }

  return DOC_PAGES.map((page) => ({
    slug: page.meta.slug,
    title: page.meta.title,
    description: page.meta.description,
    section: sectionBySlug.get(page.meta.slug) ?? "Docs",
  }));
})();

export function filterDocSearchItems(query: string, limit = 12): DocSearchItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return DOC_SEARCH_INDEX.filter(
    (item) =>
      item.title.toLowerCase().includes(normalized) ||
      item.description.toLowerCase().includes(normalized) ||
      item.slug.includes(normalized),
  ).slice(0, limit);
}
