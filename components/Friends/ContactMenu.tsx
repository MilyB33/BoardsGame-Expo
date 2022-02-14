import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigation } from "@react-navigation/native";
import useBooleanState from "../../hooks/useBooleanState";

import { View, StyleSheet } from "react-native";
import { Menu, Divider, IconButton, Portal } from "react-native-paper";
import ActivityIndicator from "../Generic/ActivityIndicator";
import DeleteFriendDialog from "./DeleteFriendsDialog";

import { UserEntry, FriendsNavigationProps } from "../../types/types";

interface PropTypes {
  listedUser: UserEntry;
  isRequest?: boolean;
}

const ContactMenu = ({ listedUser, isRequest }: PropTypes) => {
  const { _id } = listedUser;
  const { userState, sendFriendRequest, deleteFriend } =
    useContext(UserContext);
  const { state, setToTrue, setToFalse } = useBooleanState([
    "request",
    "delete",
    "dialog",
    "menuVisibility",
  ]);
  const navigation = useNavigation<FriendsNavigationProps>();

  const openMenu = () => setToTrue("menuVisibility");
  const closeMenu = () => setToFalse("menuVisibility");
  const openDialog = () => setToTrue("dialog");
  const closeDialog = () => setToFalse("dialog");

  const isFriend = userState.friends.some((friend) => friend._id === _id);
  const isFriendRequestSent = userState.friendsRequests.sent.some(
    (user) => user._id === _id
  );

  const handleFriendRequest = async () => {
    setToTrue("request");

    await sendFriendRequest(_id);

    setToFalse("request");
    closeMenu();
  };

  const handleDeleteFriend = async () => {
    setToTrue("delete");

    await deleteFriend(_id);
  };

  const handleOpenInviteModal = () => {
    closeMenu();

    navigation.navigate("UserEventsModal", {
      userId: listedUser._id,
    });
  };

  const openDeleteDialog = () => {
    openDialog();
    closeMenu();
  };

  const Indicator = (
    <ActivityIndicator size="small" style={styles.activityIndicator} />
  );

  const Delete = state.delete ? (
    Indicator
  ) : (
    <Menu.Item
      onPress={openDeleteDialog}
      title="Usuń znajomego"
      icon="delete"
    />
  );

  const Request = state.request ? (
    Indicator
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
          visible={state["menuVisibility"]}
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
            onPress={handleOpenInviteModal}
            title="Zaproś na wydarzenie"
            icon="email-plus"
            disabled={!isFriend}
          />

          <Divider style={styles.divider} />

          {isFriend ? Delete : Request}
        </Menu>
      </View>

      {isFriend && (
        <Portal>
          <DeleteFriendDialog
            visible={state.dialog}
            onDismiss={closeDialog}
            callbackAction={handleDeleteFriend}
          />
        </Portal>
      )}
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
  activityIndicator: {
    marginTop: 10,
  },
});

export default ContactMenu;
