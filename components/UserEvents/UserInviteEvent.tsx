import React, { useState } from "react";
import { useAppDispatch } from "../../storage/App/hooks";
import {
  rejectEventRequest,
  acceptEventRequest,
} from "../../storage/Slices/userSlice";

import Event from "../Event/Event";
import EventButton from "../Generic/EventButton";
import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import ActivityIndicator from "../Generic/ActivityIndicator";

import { Event as InviteEvent } from "../../types/types";

interface PropTypes {
  event: InviteEvent;
}

const UserInviteEvent = ({ event }: PropTypes) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);

    await dispatch(acceptEventRequest(event.inviteId!));
  };

  const handleReject = async () => {
    setLoading(true);

    const requestData = {
      eventID: event._id,
      inviteID: event.inviteId!,
    };

    await dispatch(rejectEventRequest(requestData));
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
