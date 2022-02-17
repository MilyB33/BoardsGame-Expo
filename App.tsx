import "react-native-gesture-handler";
import React from "react";

import AppLayout from "./components/Layout/AppLayout";

import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StorageProvider } from "react-redux";
import { Portal } from "react-native-paper";
import theme from "./theme/theme";
import { store } from "./storage/App/store";

export default function App() {
  return (
    <StorageProvider store={store}>
      <Portal.Host>
        <PaperProvider theme={theme}>
          <AppLayout />
        </PaperProvider>
      </Portal.Host>
    </StorageProvider>
  );
}
