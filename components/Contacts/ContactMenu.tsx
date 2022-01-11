import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { Menu, Divider, IconButton } from 'react-native-paper';

interface Props {
  isSearch?: boolean;
}

const ContactMenu: React.FC<Props> = ({ isSearch = false }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.menuButton}>
      <Menu
        contentStyle={styles.menu}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="menu"
            color="white"
            style={styles.button}
            onPress={openMenu}
          />
        }
      >
        <Menu.Item
          onPress={() => {}}
          title="Konto"
          icon="account-circle"
        />
        <Menu.Item
          onPress={() => {}}
          title="Zaproś na wydarzenie"
          icon="email-plus"
        />

        <Divider style={styles.divider} />

        {isSearch || (
          <Menu.Item
            onPress={() => {}}
            title="Usuń znajomego"
            icon="delete"
          />
        )}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#bdd5ea',
  },
  menuButton: {
    marginLeft: 'auto',
  },
  button: {
    backgroundColor: '#212529',
  },
  divider: {
    backgroundColor: 'white',
    height: 2,
  },
});

export default ContactMenu;
