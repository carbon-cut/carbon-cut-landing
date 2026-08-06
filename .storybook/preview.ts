import type { Preview } from "@storybook/nextjs";
import "../src/app/globals.css";
import Wrapper from "./wrapper";
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    // Our project relies heavily on responsive Tailwind breakpoints.
    // The viewport addon makes "mobile" stories actually behave like mobile.
    viewport: {
      // Storybook 9+ uses `options` (not `viewports`) for the viewport tool.
      options: {
        mobile1: {
          name: "Mobile 1",
          styles: { width: "390px", height: "844px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1280px", height: "720px" },
          type: "desktop",
        },
      },
    },
  },
};

/* export const decorators = [Wrapper]; */

export default preview;
