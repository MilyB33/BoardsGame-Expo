import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../storage/App/hooks";
import { logout, deleteAccount } from "../../storage/Slices/userSlice";

import { StyleSheet } from "react-native";
import { Surface, Portal } from "react-native-paper";
import OptionItem from "../Generic/OptionItem";
import DeleteDialog from "./DeleteDialog";

import { NavigationProps } from "../../types/types";

const Options = () => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Home");
  };

  const showDialog = () => setVisible(true);

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
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
