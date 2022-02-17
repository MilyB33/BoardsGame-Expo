import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../storage/App/hooks";
import { logout } from "../../storage/Slices/userSlice";

import { View } from "react-native";
import { Menu, Divider, IconButton } from "react-native-paper";

import { NavigationProps, Routes } from "../../types/types";

const CustomMenu = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogout = () => {
    closeMenu();
    dispatch(logout());
    navigation.navigate("Home");
  };

  const handleNavigate = (route: Routes) => {
    closeMenu();
    navigation.navigate(route);
  };

  return (
    <View style={{ marginLeft: "auto" }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton icon="account-circle" color="white" onPress={openMenu}>
            Open menu
          </IconButton>
        }
      >
        <Menu.Item
          onPress={() => handleNavigate("UserAccount")}
          title="Konto"
          icon="account-circle"
        />
        <Menu.Item
          onPress={() => handleNavigate("Contacts")}
          title="Znajomi"
          icon="contacts"
        />
        <Menu.Item
          onPress={() => handleNavigate("UserEvents")}
          title="Twoje Wydarzenia"
          icon="application"
        />
        <Divider />
        <Menu.Item onPress={handleLogout} title="Wyloguj" icon="logout" />
      </Menu>
    </View>
  );
};

export default CustomMenu;
