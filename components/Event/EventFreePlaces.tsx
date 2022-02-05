import React from "react";

import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { Event, DispatchType } from "../../types/types";

interface Props {
  event: Event;
  changeView: DispatchType<boolean>;
}

const EventInfo: React.FC<Props> = ({ event, changeView }) => {
  return (
    <View style={styles.freePlaces}>
      <TouchableOpacity onPress={() => changeView(true)}>
        <Text
          style={styles.text}
        >{`${event.signedUsers.length} / ${event.maxPlayers}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  freePlaces: {
    position: "absolute",
    fontSize: 15,
    right: "10%",
    top: "10%",
    padding: 5,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "white",
    backgroundColor: "#fcfcfc4e",
    elevation: 5,
  },
  text: {
    fontSize: 15,
    color: "white",
    margin: 5,
  },
});

export default EventInfo;
