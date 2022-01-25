import "react-native-gesture-handler";
import React from "react";

import AppLayout from "./components/Layout/AppLayout";

import { UserContextProvider } from "./context/userContext";
import { AppContextProvider } from "./context/appContext";
import { ModalsContextProvider } from "./context/modalsContext";
import { Provider as PaperProvider } from "react-native-paper";
import { Portal } from "react-native-paper";

export default function App() {
  return (
    <Portal.Host>
      <PaperProvider>
        <AppContextProvider>
          <UserContextProvider>
            <ModalsContextProvider>
              <AppLayout />
            </ModalsContextProvider>
          </UserContextProvider>
        </AppContextProvider>
      </PaperProvider>
    </Portal.Host>
  );
}
