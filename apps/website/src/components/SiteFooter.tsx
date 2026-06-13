import { Link as RouterLink } from "@tanstack/react-router";
import { SiteFooterBar } from "../site.arv";

export function SiteFooter() {
  const footer = SiteFooterBar();

  return (
    <footer className={footer.root}>
      <div className={footer.inner}>
        <div className={footer.brand}>
          <span className={footer.brandText}>arvia-ui</span>
          <p className={footer.tagline}>
            Beautiful, crafted React components built on Arvia. Zero-config install, full theme
            control.
          </p>
        </div>

        <div className={footer.cols}>
          <div className={footer.col}>
            <p className={footer.colTitle}>Docs</p>
            <RouterLink
              to="/docs/$slug"
              params={{ slug: "introduction" }}
              className={footer.link}
            >
              Introduction
            </RouterLink>
            <RouterLink
              to="/docs/$slug"
              params={{ slug: "getting-started" }}
              className={footer.link}
            >
              Getting started
            </RouterLink>
            <RouterLink to="/docs/$slug" params={{ slug: "components" }} className={footer.link}>
              Components
            </RouterLink>
          </div>

          <div className={footer.col}>
            <p className={footer.colTitle}>Ecosystem</p>
            <a href="https://github.com/arviahq/arvia" className={footer.link} target="_blank" rel="noreferrer">
              Arvia compiler
            </a>
            <a
              href="https://github.com/arviahq/arvia-ui"
              className={footer.link}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className={footer.bottom}>MIT License · Built with Arvia</div>
    </footer>
  );
}
