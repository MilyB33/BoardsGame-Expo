import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";

import { View, StyleSheet, Modal } from "react-native";
import { Menu, Divider, IconButton } from "react-native-paper";
import ParticipantModal from "../Modals/ParticipantModal";

import { UserEntry } from "../../types/types";

interface Props {
  listedUser: UserEntry;
}

const ContactMenu: React.FC<Props> = ({ listedUser }) => {
  const { _id, username } = listedUser;
  const { user, sendFriendRequest, deleteFriend } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const isFriend = user.friends.some((friend) => friend._id === _id);
  const isFriendRequestSent = user.friendsRequests.sent.some(
    (user) => user._id === _id
  );

  return (
    <>
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
            onPress={() => setModalVisible(true)}
            title="Konto"
            icon="account-circle"
          />
          <Menu.Item
            onPress={() => {}}
            title="Zaproś na wydarzenie"
            icon="email-plus"
            disabled={!isFriend}
          />

          <Divider style={styles.divider} />

          {isFriend ? (
            <Menu.Item
              onPress={() => deleteFriend(_id)}
              title="Usuń znajomego"
              icon="delete"
            />
          ) : (
            <Menu.Item
              onPress={() => sendFriendRequest(_id)}
              title={isFriendRequestSent ? "Zaproszono" : "Zaproś"}
              icon="account-plus"
              disabled={isFriendRequestSent}
            />
          )}
        </Menu>
      </View>

      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <ParticipantModal user={listedUser} closeModal={setModalVisible} />
      </Modal>
    </>
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
