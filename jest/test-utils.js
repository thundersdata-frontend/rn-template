import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { render as RNRender } from '@testing-library/react-native';

import { theme } from './theme';

function render(ui, opts) {
  return RNRender(ui, {
    ...opts,
    wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
  });
}

export * from '@testing-library/react-native';
export { render };
