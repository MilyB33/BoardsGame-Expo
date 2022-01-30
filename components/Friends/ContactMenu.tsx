import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigation } from "@react-navigation/native";

import { View, StyleSheet, Modal } from "react-native";
import { Menu, Divider, IconButton } from "react-native-paper";
import ParticipantModal from "../Modals/ParticipantModal";
import ActivityIndicator from "../Generic/ActivityIndicator";

import { UserEntry, FriendsNavigationProps } from "../../types/types";

interface Props {
  listedUser: UserEntry;
  isRequest?: boolean;
}

const ContactMenu: React.FC<Props> = ({ listedUser, isRequest }) => {
  const { _id } = listedUser;
  const { userState, sendFriendRequest, deleteFriend } =
    useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestloading, setRequestLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigation = useNavigation<FriendsNavigationProps>();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const isFriend = userState.friends.some((friend) => friend._id === _id);
  const isFriendRequestSent = userState.friendsRequests.sent.some(
    (user) => user._id === _id
  );

  const handleFriendRequest = async () => {
    setRequestLoading(true);

    await sendFriendRequest(_id);

    setRequestLoading(false);
    closeMenu();
  };

  const handleDeleteFriend = async () => {
    setDeleteLoading(true);

    await deleteFriend(_id);

    setDeleteLoading(false);
  };

  const Delete = deleteLoading ? (
    <ActivityIndicator size="small" />
  ) : (
    <Menu.Item
      onPress={handleDeleteFriend}
      title="Usuń znajomego"
      icon="delete"
    />
  );

  const Request = requestloading ? (
    <ActivityIndicator size="small" />
  ) : (
    <Menu.Item
      onPress={handleFriendRequest}
      title={
        isRequest ? "Zaproszony" : isFriendRequestSent ? "Zaproszono" : "Zaproś"
      }
      icon="account-plus"
      disabled={isFriendRequestSent || isRequest}
    />
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
            onPress={() => {
              closeMenu();
              navigation.navigate("UserEventsModal", {
                userId: listedUser._id,
              });
            }}
            title="Zaproś na wydarzenie"
            icon="email-plus"
            disabled={!isFriend}
          />

          <Divider style={styles.divider} />

          {isFriend ? Delete : Request}
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
