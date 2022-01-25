import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

import { StyleSheet, View, Text } from "react-native";
import InfoBox from "./InfoBox";

const UserInfo = () => {
  const { userState } = useContext(UserContext);

  const userEventsCount = userState.events.userEvents.length;
  const userSignedEventCount = userState.events.userSignedEvents.length;
  const userInvitedEventCount = userState.events.userInvitedEvents.length;
  const userFriendsCount = userState.friends.length;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Statystyki</Text>
      <View style={styles.flexBox}>
        <InfoBox info={userState.username} additionalStyle={styles.username} />
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
