import React from "react";

import { StyleSheet } from "react-native";
import { Button, Surface } from "react-native-paper";

interface PropTypes {
  toggleOption: (option: string) => void;
}

const FriendsTabNavigation = ({ toggleOption }: PropTypes) => {
  return (
    <Surface style={styles.container}>
      <Button
        icon="account"
        mode="contained"
        onPress={() => toggleOption("FriendsList")}
        style={styles.button}
      >
        Znajomi
      </Button>

      <Button
        icon="book-plus"
        mode="contained"
        style={styles.button}
        onPress={() => toggleOption("FriendsRequests")}
      >
        Zaproszenia
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  button: {
    borderRadius: 0,
    width: "50%",
    paddingVertical: 10,
  },
});

export default FriendsTabNavigation;
