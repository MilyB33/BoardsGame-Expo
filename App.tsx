import "react-native-gesture-handler";
import React from "react";

import AppLayout from "./components/Layout/AppLayout";

import { ThemeProvider } from "styled-components";
import { UserContextProvider } from "./context/userContext";
import { AuthContextProvider } from "./context/authContext";
import { AppContextProvider } from "./context/appContext";
import { ModalsContextProvider } from "./context/modalsContext";
import { Provider as PaperProvider } from "react-native-paper";
import { Portal } from "react-native-paper";

import theme from "./styles/theme";

export default function App() {
  return (
    <Portal.Host>
      <PaperProvider>
        <ThemeProvider theme={theme}>
          <AppContextProvider>
            <UserContextProvider>
              <AuthContextProvider>
                <ModalsContextProvider>
                  <AppLayout />
                </ModalsContextProvider>
              </AuthContextProvider>
            </UserContextProvider>
          </AppContextProvider>
        </ThemeProvider>
      </PaperProvider>
    </Portal.Host>
  );
}
