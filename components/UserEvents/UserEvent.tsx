import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigation } from "@react-navigation/native";

import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import Event from "../Event/Event";
import EventButton from "../Generic/EventButton";

import { Event as EventType, NavigationProps } from "../../types/types";

interface PropTypes {
  event: EventType;
}

const UserEvent = ({ event }: PropTypes) => {
  const { deleteUserEvent } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const handleDelete = async () => {
    setLoading(true);
    await deleteUserEvent(event._id);
  };

  const handleDeletePress = () => {
    Alert.alert(
      "Usuwanie wydarzenia",
      "Czy na pewno chcesz usunąć to wydarzenie?",
      [
        {
          text: "Anuluj",
        },
        {
          text: "Usuń",
          onPress: handleDelete,
        },
      ],
      { cancelable: false }
    );
  };

  const renderButton = (
    <View style={styles.operationBox}>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          <View style={styles.button}>
            <EventButton
              title="Usuń"
              onPress={handleDeletePress}
              color="#e63946"
            />
          </View>
          <View style={styles.button}>
            <EventButton
              title="Edytuj"
              onPress={() => navigation.navigate("EditEvent", { event })}
              color="#2b9348"
            />
          </View>
        </>
      )}
    </View>
  );

  return <Event event={event} Button={renderButton} />;
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
});

export default UserEvent;
