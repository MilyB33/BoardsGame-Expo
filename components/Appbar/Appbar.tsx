import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../storage/App/hooks";

import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import Menu from "./Menu";

import { NavigationProps } from "../../types/types";

const CustomAppBar = () => {
  const navigation = useNavigation<NavigationProps>();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const navigateToHome = () => navigation.navigate("Home");
  const navigateToEvents = () => navigation.navigate("Events");
  const navigateToProfile = () => navigation.navigate("UserModal");

  return (
    <Appbar style={styles.bottom}>
      <Appbar.Action icon="home" onPress={navigateToHome} />
      <Appbar.Action
        style={styles.appbarItem}
        icon="clipboard-text-play"
        onPress={navigateToEvents}
      />
      {isAuthenticated ? (
        <Menu />
      ) : (
        <Appbar.Action
          style={[styles.appbarItem, styles.login]}
          icon="login-variant"
          onPress={navigateToProfile}
        />
      )}
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    paddingHorizontal: 20,
    backgroundColor: "dodgerblue",
  },
  appbarItem: {
    marginLeft: 20,
  },
  login: {
    marginLeft: "auto",
  },
});

export default CustomAppBar;
