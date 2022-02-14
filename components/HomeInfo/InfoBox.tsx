import React from "react";

import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";

interface PropTypes {
  text: string;
  link?: React.ReactNode;
  additional?: React.ReactNode;
}

const InfoBox = ({ text, link, additional }: PropTypes) => {
  return (
    <Surface style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {link}
      {additional}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 20,
    backgroundColor: "#560bad99",
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: "dodgerblue",
    width: "90%",
    elevation: 8,
  },
  text: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default InfoBox;
