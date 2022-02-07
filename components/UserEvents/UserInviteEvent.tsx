import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";

import Event from "../Event/Event";
import EventButton from "../Generic/EventButton";
import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import ActivityIndicator from "../Generic/ActivityIndicator";

import { Event as InviteEvent } from "../../types/types";

interface Props {
  event: InviteEvent;
}

const UserInviteEvent: React.FC<Props> = ({ event }) => {
  const [loading, setLoading] = useState(false);
  const { rejectEventRequest, acceptEventRequest } = useContext(UserContext);

  const handleAccept = async () => {
    setLoading(true);
    await acceptEventRequest(event.inviteId!, event._id);
  };

  const handleReject = async () => {
    setLoading(true);
    await rejectEventRequest(event.inviteId!, event._id);
  };

  const renderButton = loading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.operationBox}>
      <View style={styles.button}>
        <EventButton title="Akceptuj" onPress={handleAccept} color="#2b9348" />
      </View>
      <View style={styles.button}>
        <EventButton title="Odrzuć" onPress={handleReject} color="#e63946" />
      </View>
    </View>
  );
  return (
    <Surface style={styles.box}>
      <Event event={event} Button={renderButton} />
      <Surface style={styles.textBox}>
        <Text style={styles.text}>
          Zaproszony przez: {event.invitedBy?.username}
        </Text>
      </Surface>
    </Surface>
  );
};

const styles = StyleSheet.create({
  operationBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 5,
    flex: 1,
  },
  box: {
    backgroundColor: "transparent",
  },
  textBox: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,

    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderColor: "#0be48ab3",
  },
  text: {
    color: "white",
  },
});

export default UserInviteEvent;
