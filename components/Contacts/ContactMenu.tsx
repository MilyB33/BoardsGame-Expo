import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";

import { View, StyleSheet } from "react-native";
import { Menu, Divider, IconButton } from "react-native-paper";

interface Props {
  userId: string;
}

const ContactMenu: React.FC<Props> = ({ userId }) => {
  const { user, sendFriendRequest } = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const isFriend = user.friends.some((friend) => friend._id === userId);
  const isFriendRequestSent = user.friendsRequests.sent.some(
    (user) => user._id === userId
  );

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
        <Menu.Item onPress={() => {}} title="Konto" icon="account-circle" />
        <Menu.Item
          onPress={() => {}}
          title="Zaproś na wydarzenie"
          icon="email-plus"
          disabled={!isFriend}
        />

        <Divider style={styles.divider} />

        {isFriend ? (
          <Menu.Item onPress={() => {}} title="Usuń znajomego" icon="delete" />
        ) : (
          <Menu.Item
            onPress={() => sendFriendRequest(userId)}
            title={isFriendRequestSent ? "Zaproszono" : "Zaproś"}
            icon="account-plus"
            disabled={isFriendRequestSent}
          />
        )}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#bdd5ea",
  },
  menuButton: {
    marginLeft: "auto",
  },
  button: {
    backgroundColor: "#212529",
  },
  divider: {
    backgroundColor: "white",
    height: 2,
  },
});

export default ContactMenu;
