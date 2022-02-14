import React, { useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import Participant from "./Participant";
import { IconButton } from "react-native-paper";

import { DispatchType } from "../../types/types";

interface PropTypes {
  users: {
    username: string;
    _id: string;
  }[];
  changeView: DispatchType<boolean>;
}

const Participants = ({ users, changeView }: PropTypes) => {
  const [isClosed, setIsClosed] = useState(false);

  const renderParticipants = () =>
    users.map((user) => <Participant key={user._id} user={user} />);

  const usersLength = users.length > 2;

  const MoreButton = (
    <View style={styles.moreButton}>
      <IconButton
        icon={isClosed ? "chevron-down" : "chevron-up"}
        animated={true}
        color="white"
        onPress={() => setIsClosed(!isClosed)}
      />
    </View>
  );

  const renderParticipantsList = isClosed
    ? renderParticipants()
    : renderParticipants().slice(0, 2);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.text, styles.header]}>Uczestnicy:</Text>
        <IconButton
          icon="hand-pointing-left"
          style={[styles.icon, styles.backIcon]}
          color="white"
          size={25}
          onPress={() => changeView(false)}
        />
      </View>
      <View>
        {usersLength ? (
          <>
            {renderParticipantsList}
            {MoreButton}
          </>
        ) : (
          renderParticipants()
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "white",
  },
  headerContainer: {
    padding: 10,
    flexDirection: "row",
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
  },

  icon: {
    backgroundColor: "dodgerblue",
    marginLeft: "auto",
  },
  backIcon: {
    marginRight: 0,
  },
  moreButton: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "dodgerblue",
    borderRadius: 50,
  },
});

export default Participants;
