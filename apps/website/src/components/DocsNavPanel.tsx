import { useMemo, useState } from "react";
import { Link as RouterLink, useRouterState } from "@tanstack/react-router";
import { Input } from "@arvia-ui/react";
import { DocsNav } from "../site.arv";
import { DOC_NAV } from "../docs/registry";
import { filterDocSearchItems } from "../docs/search-index";

function DocsNavSections(props: { activeSlug?: string; onNavigate?: () => void }) {
  const nav = DocsNav();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
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
                  onClick={props.onNavigate}
                >
                  {item.title}
                </RouterLink>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

export function DocsNavPanel(props: { activeSlug?: string; onNavigate?: () => void }) {
  const nav = DocsNav();
  const [query, setQuery] = useState("");
  const results = useMemo(() => filterDocSearchItems(query), [query]);
  const showResults = query.trim().length > 0;

  function handleNavigate() {
    setQuery("");
    props.onNavigate?.();
  }

  return (
    <div className={nav.root}>
      <div className={nav.search}>
        <Input
          size="sm"
          type="search"
          placeholder="Search docs…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search documentation"
        />
      </div>

      {showResults ? (
        <div className={nav.results} role="listbox" aria-label="Search results">
          {results.length === 0 ? (
            <p className={nav.empty}>No results found.</p>
          ) : (
            results.map((item) => (
              <RouterLink
                key={item.slug}
                to="/docs/$slug"
                params={{ slug: item.slug }}
                className={nav.result}
                role="option"
                onClick={handleNavigate}
              >
                <span className={nav.resultTitle}>{item.title}</span>
                <span className={nav.resultDesc}>{item.section}</span>
              </RouterLink>
            ))
          )}
        </div>
      ) : (
        <DocsNavSections activeSlug={props.activeSlug} onNavigate={props.onNavigate} />
      )}
    </div>
  );
}
