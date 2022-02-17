import React from "react";
import { useAppSelector } from "../../storage/App/hooks";

import { StyleSheet, View, Text } from "react-native";
import InfoBox from "./InfoBox";

const UserInfo = () => {
  const { events, friends, username } = useAppSelector((state) => state.user);

  const userEventsCount = events.userEvents.length;
  const userSignedEventCount = events.userSignedEvents.length;
  const userInvitedEventCount = events.userInvitedEvents.length;
  const userFriendsCount = friends.length;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Statystyki</Text>
      <View style={styles.flexBox}>
        <InfoBox info={username} additionalStyle={styles.username} />
        <InfoBox
          title="Liczba wydarzeń twoich wydarzeń"
          info={userEventsCount}
        />
        <InfoBox
          title="Wydarzenia w których bierzesz udział"
          info={userSignedEventCount}
        />
        <InfoBox
          title="Wydarzenia na które jesteś zaproszony"
          info={userInvitedEventCount}
        />
        <InfoBox title="Liczba znajomych" info={userFriendsCount} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
  flexBox: {
    flex: 1,
    justifyContent: "center",
  },
  username: {
    justifyContent: "center",
  },
});

export default UserInfo;
