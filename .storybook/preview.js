export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

import "../src/index.css";
import "@l1ck0h/every-layout.css/every-layout.min.css";
export const decorators = [(Story) => <Story />];
