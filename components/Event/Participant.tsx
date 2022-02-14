import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

import { UserEntry } from "../../types/types";

interface PropTypes {
  user: UserEntry;
}

const Participant = ({ user }: PropTypes) => {
  return (
    <View style={styles.participant}>
      <Text style={styles.text}>{user.username}</Text>
      <Avatar.Icon size={40} icon="account" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "dodgerblue",
    marginLeft: "auto",
  },
  participant: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "rgba(0,0,0,.2)",
  },
  text: {
    color: "white",
  },
});

export default Participant;
