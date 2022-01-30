import { DefaultTheme } from "react-native-paper";

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {} // To declare own colors in typescript
    interface Theme {} // to declare own properties in typescript
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

export default theme;
