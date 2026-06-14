import { Link as RouterLink, useRouterState } from "@tanstack/react-router";
import { DocsNav } from "../site.arv";
import { DOC_NAV } from "../docs/registry";

export function DocsNavLinks(props: { activeSlug?: string; onNavigate?: () => void }) {
  const nav = DocsNav();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
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
                  onClick={props.onNavigate}
                >
                  {item.title}
                </RouterLink>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
