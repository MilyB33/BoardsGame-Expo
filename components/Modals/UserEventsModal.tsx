import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useRoute } from "@react-navigation/native";

import { StyleSheet, FlatList } from "react-native";
import { Surface, Divider, Text } from "react-native-paper";
import Event from "../Event/Event";
import EventButton from "../Generic/EventButton";
import EmptyRedirect from "../Friends/EmptyRedirect";
import ActivityIndicator from "../Generic/ActivityIndicator";

import { FriendsStackParamList } from "../../types/types";
import { RouteProp } from "@react-navigation/native";

type UserEventRootProp = RouteProp<FriendsStackParamList, "UserEventsModal">;

const UserEventsModal = () => {
  const [loading, setLoading] = useState(false);
  const {
    userState: {
      events: { userEvents },
    },
    sendEventRequest,
  } = useContext(UserContext);
  const route = useRoute<UserEventRootProp>();

  const handlePress = async (eventId: string) => {
    setLoading(true);

    await sendEventRequest(eventId, route.params.userId);
  };

  const Header = <Text style={styles.text}>Wybierz wydarzenie</Text>;

  const filteredEvents = userEvents.filter(
    (event) =>
      !event.invites.some(
        (invite) => invite.user._id === route.params.userId
      ) &&
      !event.signedUsers.some((user) => user._id === route.params.userId) &&
      event.isPrivate
  );

  return (
    <Surface style={styles.list}>
      <FlatList
        ListHeaderComponent={Header}
        style={styles.flatList}
        data={filteredEvents}
        renderItem={({ item }) => (
          <Event
            event={item}
            Button={
              loading ? (
                <ActivityIndicator />
              ) : (
                <EventButton
                  onPress={() => handlePress(item._id)}
                  title="Zaproś"
                />
              )
            }
          />
        )}
        keyExtractor={(item) => item._id.toString()}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        extraData={filteredEvents}
        ListEmptyComponent={<EmptyRedirect />}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flex: 1,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,

    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    color: "white",
    borderRadius: 10,
  },
  flatList: {
    padding: 10,
    height: "100%",
    marginBottom: 20,
  },
  divider: {
    height: 5,
    backgroundColor: "white",
  },
});

export default UserEventsModal;
