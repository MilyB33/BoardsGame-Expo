import 'react-native-gesture-handler';
import React from 'react';

import AppLayout from './components/Layout/AppLayout';

import { ThemeProvider } from 'styled-components';
import { UserContextProvider } from './context/userContext';
import { AppContextProvider } from './context/appContext';
import { ModalsContextProvider } from './context/modalsContext';

import theme from './styles/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <UserContextProvider>
          <ModalsContextProvider>
            <AppLayout />
          </ModalsContextProvider>
        </UserContextProvider>
      </AppContextProvider>
    </ThemeProvider>
  );
}
