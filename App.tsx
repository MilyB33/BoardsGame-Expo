import React from 'react';

import AppLayout from './components/Layout/AppLayout';

import { ThemeProvider } from 'styled-components';

import theme from './styles/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppLayout />
    </ThemeProvider>
  );
}
