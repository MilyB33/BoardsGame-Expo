import React from "react";
import { useAppDispatch } from "../../storage/App/hooks";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../storage/Slices/userSlice";

import { StyleSheet } from "react-native";
import { Surface, Text, IconButton } from "react-native-paper";
import ContactMenu from "./ContactMenu";

import { UserEntry } from "../../types/types";

interface PropTypes {
  user: UserEntry;
  isRequest?: boolean;
}

const ContactItem = ({ user, isRequest = false }: PropTypes) => {
  const dispatch = useAppDispatch();
  const { _id, username } = user;

  const Request = (
    <Surface style={styles.actionButtons}>
      <IconButton
        icon="check"
        size={25}
        onPress={() => dispatch(acceptFriendRequest(_id))}
        style={styles.button}
        color="white"
      />
      <IconButton
        icon="close"
        size={25}
        onPress={() => dispatch(rejectFriendRequest(_id))}
        style={styles.button}
        color="white"
      />
    </Surface>
  );

  return (
    <Surface style={styles.container}>
      <Text style={styles.text}>{username}</Text>

      {isRequest ? Request : null}

      <ContactMenu listedUser={user} isRequest={isRequest} />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#560bad99",
    elevation: 8,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  button: {
    backgroundColor: "#1d6fc2c0",
    borderRadius: 0,
  },
  actionButtons: {
    marginLeft: "auto",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
});

export default ContactItem;
