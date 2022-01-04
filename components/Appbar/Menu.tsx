import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/userContext';

import { View } from 'react-native';
import { Menu, Divider, IconButton } from 'react-native-paper';

import { NavigationProps, Roots } from '../../types/types';

const CustomMenu = () => {
  const navigation = useNavigation<NavigationProps>();
  const { logout } = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogout = () => {
    closeMenu();
    logout();
    navigation.navigate('Home');
  };

  const handleNavigate = (route: Roots) => {
    closeMenu();
    navigation.navigate(route);
  };

  return (
    <View style={{ marginLeft: 'auto' }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="account-circle"
            color="white"
            onPress={openMenu}
          >
            Open menu
          </IconButton>
        }
      >
        <Menu.Item
          onPress={() => handleNavigate('UserAccount')}
          title="Konto"
          icon="account-circle"
        />
        <Menu.Item
          onPress={() => handleNavigate('Contacts')}
          title="Znajomi"
          icon="contacts"
        />
        <Menu.Item
          onPress={() => handleNavigate('UserEvents')}
          title="Twoje Wydarzenia"
          icon="application"
        />
        <Menu.Item
          onPress={() => {}}
          title="Ulubione gry"
          icon="playlist-star"
        />
        <Divider />
        <Menu.Item
          onPress={handleLogout}
          title="Wyloguj"
          icon="logout"
        />
      </Menu>
    </View>
  );
};

export default CustomMenu;
