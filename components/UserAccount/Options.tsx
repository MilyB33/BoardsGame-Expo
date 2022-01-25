import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/userContext";

import { StyleSheet } from "react-native";
import { Surface, Portal } from "react-native-paper";
import OptionItem from "../Generic/OptionItem";
import DeleteDialog from "./DeleteDialog";

import { NavigationProps } from "../../types/types";

const Options = () => {
  const [visible, setVisible] = useState(false);
  const { logout, deleteAccount } = useContext(UserContext);
  const navigation = useNavigation<NavigationProps>();

  const handleLogout = () => {
    logout();
    navigation.navigate("Home");
  };

  const showDialog = () => setVisible(true);

  const handleDeleteAccount = () => {
    deleteAccount();
    navigation.navigate("Home");
  };

  return (
    <>
      <Surface style={styles.container}>
        <OptionItem
          title="Zmień hasło"
          icon="lock"
          onPress={() => navigation.navigate("ChangePasswordModal")}
        />

        <OptionItem
          title="Usuń konto"
          icon="delete"
          onPress={showDialog}
          buttonColor="#ff0000"
        />

        <OptionItem title="Wyloguj" icon="logout" onPress={handleLogout} />
      </Surface>

      <Portal>
        <DeleteDialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          callbackAction={handleDeleteAccount}
        />
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "transparent",
    justifyContent: "space-evenly",
  },
});

export default Options;
