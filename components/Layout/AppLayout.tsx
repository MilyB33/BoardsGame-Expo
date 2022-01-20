import React from "react";

import { StatusBar, StyleSheet, Platform, SafeAreaView } from "react-native";
import Navigation from "../Navigation/Root";

const Layout = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="dodgerblue" />
        <Navigation />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default Layout;
