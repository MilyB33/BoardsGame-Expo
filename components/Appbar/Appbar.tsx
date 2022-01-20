import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/userContext";

import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import Menu from "./Menu";

import { NavigationProps } from "../../types/types";

const CustomAppBar = () => {
  const navigation = useNavigation<NavigationProps>();
  const { user } = useContext(UserContext);

  return (
    <Appbar style={styles.bottom}>
      <Appbar.Action icon="home" onPress={() => navigation.navigate("Home")} />
      <Appbar.Action
        style={styles.appbarItem}
        icon="clipboard-text-play"
        onPress={() => navigation.navigate("Events")}
      />
      {user.isAuthenticated ? (
        <Menu />
      ) : (
        <Appbar.Action
          style={[styles.appbarItem, styles.login]}
          icon="login-variant"
          onPress={() => navigation.navigate("UserModal")}
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
