import type { ComponentType, ReactNode } from "react";

export type PropDefinition = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

/** Interactive controls config. Either pass `Component` (rendered with the live args)
 *  or a custom `render`. `args` seeds initial values; `controls` optionally whitelists
 *  which prop names get controls (otherwise every non-function prop is inferred). */
export type PlaygroundConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component?: ComponentType<any>;
  render?: (args: Record<string, unknown>) => ReactNode;
  args?: Record<string, unknown>;
  controls?: string[];
};

export type ComponentDoc = {
  slug: string;
  title: string;
  description: string;
  importName: string;
  props: PropDefinition[];
  usage: string;
  Preview: () => ReactNode;
  Examples?: () => ReactNode;
  playground?: PlaygroundConfig;
};
