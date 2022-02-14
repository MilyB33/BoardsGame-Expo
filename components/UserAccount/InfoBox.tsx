import React from "react";

import { StyleSheet, View, Text } from "react-native";

interface PropTypes {
  title?: string;
  info: string | number | boolean | undefined;
  additionalStyle?: any;
}

const InfoBox = ({ title, info, additionalStyle = {} }: PropTypes) => {
  return (
    <View style={[styles.container, additionalStyle]}>
      {title && <Text style={styles.title}>{`${title}:`}</Text>}
      <Text style={[styles.info, additionalStyle]}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 15,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "dodgerblue",
    backgroundColor: "#560bad99",
  },
  title: {
    marginRight: 10,
    fontSize: 16,
    color: "white",
  },
  info: {
    fontSize: 16,
    color: "white",
  },
});

export default InfoBox;
