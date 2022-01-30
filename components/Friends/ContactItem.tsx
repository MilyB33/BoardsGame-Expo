import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

import { StyleSheet } from "react-native";
import { Surface, Text, IconButton } from "react-native-paper";
import ContactMenu from "./ContactMenu";

import { UserEntry } from "../../types/types";

interface Props {
  user: UserEntry;
  isRequest?: boolean;
}

const ContactItem: React.FC<Props> = ({ user, isRequest = false }) => {
  const { acceptFriendRequest, rejectFriendRequest } = useContext(UserContext);
  const { _id, username } = user;

  const Request = (
    <Surface style={styles.actionButtons}>
      <IconButton
        icon="check"
        size={25}
        onPress={() => acceptFriendRequest(_id)}
        style={styles.button}
        color="white"
      />
      <IconButton
        icon="close"
        size={25}
        onPress={() => rejectFriendRequest(_id)}
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
