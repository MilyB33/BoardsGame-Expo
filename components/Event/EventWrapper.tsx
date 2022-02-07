import React from "react";

import { View, StyleSheet } from "react-native";

interface Props {
  children: React.ReactNode;
}

const EventWrapper: React.FC<Props> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    margin: 15,
    padding: 15,
    minHeight: 220,
    backgroundColor: "#560bad",
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: "dodgerblue",
    width: 300,
  },
});

export default EventWrapper;
