import React from "react";

import { StyleSheet } from "react-native";
import { Surface, Text, IconButton } from "react-native-paper";
import ContactMenu from "./ContactMenu";

import { UserEntry } from "../../types/types";

interface Props {
  user: UserEntry;
  isRequest?: boolean;
}

const ContactItem: React.FC<Props> = ({ user, isRequest = false }) => {
  const { _id, username } = user;

  const Request = (
    <Surface style={styles.actionButtons}>
      <IconButton
        icon="check"
        size={20}
        onPress={() => {}}
        style={styles.approveButton}
        color="white"
      />
      <IconButton
        icon="close"
        size={20}
        onPress={() => {}}
        style={styles.rejectButton}
        color="white"
      />
    </Surface>
  );

  return (
    <Surface style={styles.container}>
      <Text style={styles.text}>{username}</Text>

      {isRequest ? Request : null}

      <ContactMenu userId={_id} />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  button: {
    backgroundColor: "#212529",
  },
  actionButtons: {
    marginLeft: "auto",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  approveButton: {
    backgroundColor: "green",
    marginRight: 20,
  },
  rejectButton: {
    backgroundColor: "red",
  },
});

export default ContactItem;
