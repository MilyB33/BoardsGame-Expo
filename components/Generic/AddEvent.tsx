import React from "react";
import { useNavigation } from "@react-navigation/native";

import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

import { NavigationProps } from "../../types/types";

const AddEventButton = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <IconButton
        icon="plus"
        onPress={() => navigation.navigate("AddEvent")}
        style={styles.fab}
        size={40}
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
  },
  fab: {
    backgroundColor: "dodgerblue",
  },
});

export default AddEventButton;
