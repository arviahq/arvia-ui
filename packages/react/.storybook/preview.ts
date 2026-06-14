import type { Preview } from "@storybook/react";
import "@arvia-ui/core-styles/theme.arv";

// Theming is pure native CSS — flip the attribute directly (no library runtime).
const applyTheme = (mode: string) =>
  document.documentElement.setAttribute("data-arvia-theme", mode);

const preview: Preview = {
  parameters: {
    layout: "centered",
  },
  globalTypes: {
    arviaTheme: {
      description: "Arvia theme mode",
      toolbar: {
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      applyTheme((context.globals.arviaTheme as string) ?? "light");
      return Story();
    },
  ],
};

export default preview;
