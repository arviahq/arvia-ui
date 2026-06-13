import type { ReactNode } from "react";

export type PropDefinition = {
  name: string;
  type: string;
  default?: string;
  description: string;
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
};
