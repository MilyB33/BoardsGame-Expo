import React from "react";

import { StyleSheet, View, Text } from "react-native";

interface Props {
  title?: string;
  info: string | number | boolean | undefined;
  additionalStyle?: any;
}

const InfoBox: React.FC<Props> = ({ title, info, additionalStyle = {} }) => {
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
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginVertical: 15,
    backgroundColor: "dodgerblue",
    borderRadius: 5,
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
