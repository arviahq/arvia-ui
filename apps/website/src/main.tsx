import "@arvia-ui/core-styles/theme.arv";
import "./site.arv";
import "./code.css";
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { applyTheme, getStoredTheme } from "./preferences";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function Root() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = getStoredTheme();
    if (stored) applyTheme(stored); // else fall through to OS color-scheme
    setReady(true);
  }, []);

  if (!ready) return null;
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
