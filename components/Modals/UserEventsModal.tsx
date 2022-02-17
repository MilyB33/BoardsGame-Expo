import React from "react";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../storage/App/hooks";
import { sendEventRequest } from "../../storage/Slices/userSlice";

import { StyleSheet, FlatList } from "react-native";
import { Surface, Divider, Text } from "react-native-paper";
import Event from "../Event/Event";
import EventButton from "../Generic/EventButton";
import EmptyRedirect from "../Friends/EmptyRedirect";
import WithLoading from "../../hoc/withLoading";

import { FriendsStackParamList } from "../../types/types";
import { RouteProp } from "@react-navigation/native";

const ButtonWithLoading = WithLoading(EventButton);

type UserEventRootProp = RouteProp<FriendsStackParamList, "UserEventsModal">;

const UserEventsModal = () => {
  const dispatch = useAppDispatch();
  const { userEvents } = useAppSelector((state) => state.user.events);

  const route = useRoute<UserEventRootProp>();

  const handlePress = async (eventID: string) => {
    const requestData = { eventID, requestedUserID: route.params.userId };
    await dispatch(sendEventRequest(requestData));
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
              <ButtonWithLoading
                title="Zaproś"
                onPress={() => handlePress(item._id)}
              />
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
