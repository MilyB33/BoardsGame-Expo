import React from "react";

import { StyleSheet, View, Text } from "react-native";

interface Props {
  title: string;
  info: string | number | boolean | undefined;
  additionalStyle?: any;
}

const InfoBox: React.FC<Props> = ({ title, info, additionalStyle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${title}:`}</Text>
      <Text style={[styles.info, additionalStyle]}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderBottomWidth: 4,
    borderBottomColor: "dodgerblue",
    marginVertical: 15,
  },
  title: {
    marginRight: 10,
    fontSize: 20,
  },
  info: {
    fontSize: 20,
  },
});

export default InfoBox;
