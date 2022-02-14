import React from "react";

import { View, Text, StyleSheet } from "react-native";

interface PropTypes {
  title: string;
}

const Header = ({ title }: PropTypes) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {},
  headerText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Header;
