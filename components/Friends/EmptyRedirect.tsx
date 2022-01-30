import React from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";
import EventButton from "../Generic/EventButton";

import { NavigationProps } from "../../types/types";

const EmptyRedirect = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <Surface style={styles.container}>
      <Text style={styles.text}>Brak wydarzeń?</Text>
      <EventButton
        title="Dodaj jakieś"
        onPress={() => navigation.navigate("AddEvent")}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#5390d9",
    borderRadius: 10,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
});

export default EmptyRedirect;
