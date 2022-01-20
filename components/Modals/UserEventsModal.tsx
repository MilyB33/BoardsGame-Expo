import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useRoute } from "@react-navigation/native";

import { StyleSheet, FlatList } from "react-native";
import { Surface, Divider, Text } from "react-native-paper";
import Event from "../Event/Event";
import EventButton from "../Generic/EventButton";
import EmptyRedirect from "../Contacts/EmptyRedirect";

import { FriendsStackParamList } from "../../types/types";
import { RouteProp } from "@react-navigation/native";

type UserEventRootProp = RouteProp<FriendsStackParamList, "UserEventsModal">;

const UserEventsModal = () => {
  const {
    user: {
      events: { userEvents },
    },
  } = useContext(UserContext);
  const route = useRoute<UserEventRootProp>();

  const InviteButton = <EventButton onPress={() => {}} title="Zaproś" />;

  const Header = <Text style={styles.text}>Wybierz wydarzenie</Text>;

  return (
    <Surface style={styles.list}>
      <FlatList
        ListHeaderComponent={Header}
        style={styles.flatList}
        data={userEvents.filter((event) =>
          event.invitedUsers.includes(route.params.userId)
        )}
        renderItem={({ item }) => <Event event={item} Button={InviteButton} />}
        keyExtractor={(item) => item._id.toString()}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        extraData={userEvents.filter((event) =>
          event.invitedUsers.includes(route.params.userId)
        )}
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
