import React from "react";

import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";
import SearchUserButton from "./SearchUserButton";

const Empty = () => {
  return (
    <Surface style={styles.boxWrapper}>
      <Text style={styles.text}>Brak znajomych</Text>
      <SearchUserButton />
    </Surface>
  );
};

const styles = StyleSheet.create({
  boxWrapper: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    marginTop: "auto",
    marginBottom: "auto",
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,

    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    color: "white",
    borderRadius: 10,
  },
});

export default Empty;
