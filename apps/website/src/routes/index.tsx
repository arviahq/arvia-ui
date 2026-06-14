import type { ReactNode } from "react";
import { Link as RouterLink, createFileRoute } from "@tanstack/react-router";
import { Badge, Button } from "@arvia-ui/react";
import { FeatureCard, FeatureGrid, Hero, HeroShell, SectionHead, SitePage } from "../site.arv";
import { HeroBackground } from "../components/HeroBackground";
import { usePageMeta } from "../page-meta";

export const Route = createFileRoute("/")({
  component: HomeRoute,
});

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const FEATURES: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: (
      <Icon>
        <path d="M12 3v12" />
        <path d="m7 11 5 5 5-5" />
        <path d="M5 21h14" />
      </Icon>
    ),
    title: "Zero-config install",
    body: "npm install @arvia-ui/react and import. Styles are pre-compiled and bundled — no Vite plugin, no theme import, no setup.",
  },
  {
    icon: (
      <Icon>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </Icon>
    ),
    title: "Typed variants",
    body: "Every variant prop is typed. Autocomplete tones, sizes, and states — and catch invalid combinations at compile time.",
  },
  {
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </Icon>
    ),
    title: "Light & dark modes",
    body: 'Both modes ship in the CSS. setTheme("dark") flips a data attribute and every component follows — no flash, no extra config.',
  },
  {
    icon: (
      <Icon>
        <path d="M12 2 2 7l10 5 10-5-10-5z" />
        <path d="M2 12l10 5 10-5" />
        <path d="M2 17l10 5 10-5" />
      </Icon>
    ),
    title: "Styles in Arvia",
    body: "Each component is backed by an .arv file. Variants, slots, states, and responsive rules compile to static CSS at publish time.",
  },
  {
    icon: (
      <Icon>
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
      </Icon>
    ),
    title: "Zero runtime CSS",
    body: "No CSS-in-JS, no style recalculation in the browser. Components map props to class names backed by one stylesheet.",
  },
  {
    icon: (
      <Icon>
        <circle cx="12" cy="5" r="2" />
        <path d="M5 9h14" />
        <path d="M12 7v6" />
        <path d="m9 21 3-7 3 7" />
      </Icon>
    ),
    title: "Accessible defaults",
    body: "Semantic HTML, forwarded refs, focus rings, and press effects — tuned for real product UI out of the box.",
  },
];

function HomeRoute() {
  const shell = HeroShell();
  const hero = Hero();
  const page = SitePage();
  const grid = FeatureGrid();
  const head = SectionHead();

  usePageMeta(
    undefined,
    "Beautiful, crafted React components built on Arvia. Zero-config install, typed variants, light & dark modes, zero runtime CSS.",
  );

  return (
    <div>
      <div className={shell.root}>
        <div className={shell.backdrop}>
          <HeroBackground />
        </div>
        <section className={shell.content + " " + hero.root}>
          <div className={hero.badge}>
            <Badge tone="primary">zero-config · fully typed</Badge>
          </div>
          <h1 className={hero.title}>
            Beautiful React components.
            <br />
            Zero-config by design.
          </h1>
          <p className={hero.lead}>
            arvia-ui pairs shared <code>.arv</code> styles with thin React wrappers — typed
            variants, light &amp; dark modes, and production-ready accessibility. Install one
            package and import.
          </p>
          <div className={hero.actions}>
            <RouterLink to="/docs/$slug" params={{ slug: "getting-started" }}>
              <Button size="lg">Get started</Button>
            </RouterLink>
            <a href="https://github.com/arviahq/arvia-ui" target="_blank" rel="noreferrer">
              <Button tone="secondary" size="lg">
                View on GitHub
              </Button>
            </a>
          </div>
          <p className={hero.meta}>
            <span className={hero.metaCmd}>npm install @arvia-ui/react</span>
            <span>· React 18+ · any bundler</span>
          </p>
        </section>
      </div>

      <div className={page.root}>
        <div className={grid.root}>
          {FEATURES.map((feature) => {
            const card = FeatureCard();
            return (
              <div key={feature.title} className={card.root}>
                <span className={card.icon}>{feature.icon}</span>
                <h3 className={card.title}>{feature.title}</h3>
                <p className={card.body}>{feature.body}</p>
              </div>
            );
          })}
        </div>

        <section style={{ paddingBottom: 96 }}>
          <div className={head.root}>
            <h2 className={head.title}>Ready to build?</h2>
            <p className={head.lead}>
              One install, no config. Drop in components and ship — light and dark included.
            </p>
          </div>
          <div className={hero.actions}>
            <RouterLink to="/docs/$slug" params={{ slug: "getting-started" }}>
              <Button size="lg">Read the docs</Button>
            </RouterLink>
            <RouterLink to="/docs/$slug" params={{ slug: "components" }}>
              <Button tone="secondary" size="lg">
                Browse components
              </Button>
            </RouterLink>
          </div>
        </section>
      </div>
    </div>
  );
}
