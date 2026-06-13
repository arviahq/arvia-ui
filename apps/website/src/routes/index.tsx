import { Link as RouterLink, createFileRoute } from "@tanstack/react-router";
import { Badge, Button, Link, Stack, Text } from "@arviahq/ui-react";
import { FeatureCard, FeatureGrid, Hero, SitePage } from "../site.arv";
import { usePageMeta } from "../page-meta";

export const Route = createFileRoute("/")({
  component: HomeRoute,
});

const FEATURES = [
  {
    icon: "◆",
    title: "Styles in Arvia",
    body: "Every component is backed by a .arv file — variants, slots, states, and responsive rules compile to static CSS.",
  },
  {
    icon: "◇",
    title: "Thin React wrappers",
    body: "Import from @arviahq/ui-react for semantic HTML, refs, and accessibility. No runtime CSS-in-JS.",
  },
  {
    icon: "○",
    title: "Shared across frameworks",
    body: "@arviahq/ui-styles holds the design tokens and component styles. Vue and Preact packages are on the roadmap.",
  },
  {
    icon: "▣",
    title: "Light & dark modes",
    body: "Built-in theme modes via data-arvia-theme. Toggle once, every component follows.",
  },
  {
    icon: "◎",
    title: "Crafted defaults",
    body: "Teal and stone palette, focus rings, press effects, and elevation tuned for real product UI.",
  },
  {
    icon: "▤",
    title: "Vite-native DX",
    body: "Works with @arviahq/vite-plugin-react — HMR on .arv files, generated TypeScript types, zero runtime.",
  },
];

function HomeRoute() {
  const hero = Hero();
  const page = SitePage();
  const grid = FeatureGrid();

  usePageMeta(
    undefined,
    "Beautiful, crafted UI components built on Arvia. Styles in .arv, thin React wrappers, full theme control.",
  );

  return (
    <div>
      <section className={hero.root}>
        <div className={hero.badge}>
          <Badge tone="primary">v0.1 — React</Badge>
        </div>
        <h1 className={hero.title}>Components crafted with Arvia</h1>
        <p className={hero.lead}>
          arvia-ui pairs shared .arv styles with framework wrappers — beautiful defaults, typed variants, and
          production-ready accessibility out of the box.
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
      </section>

      <div className={page.root}>
        <div className={grid.root}>
          {FEATURES.map((feature) => {
            const card = FeatureCard();
            return (
              <div key={feature.title} className={card.root}>
                <div className={card.icon}>{feature.icon}</div>
                <h3 className={card.title}>{feature.title}</h3>
                <p className={card.body}>{feature.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={page.root} style={{ paddingBottom: 96, textAlign: "center" }}>
        <Stack gap="4" align="center">
          <Text size="lg" weight="medium">
            Ready to try it?
          </Text>
          <Text tone="muted">
            Install <code>@arviahq/ui-react</code> and wire up the Vite plugin in minutes.
          </Text>
          <Stack direction="row" gap="3" justify="center" wrap="yes">
            <RouterLink to="/docs/$slug" params={{ slug: "getting-started" }}>
              <Button>Read the docs</Button>
            </RouterLink>
            <Link href="https://github.com/arviahq/arvia" tone="muted">
              Learn about Arvia →
            </Link>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}
