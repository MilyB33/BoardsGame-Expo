import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";

import { View, StyleSheet } from "react-native";
import PlainEvent from "./PlainEvent";
import RefreshButton from "../Generic/RefreshButton";
import MoreButton from "../Generic/MoreButton";

import { Event as EventType } from "../../types/types";

const AllEvents = () => {
  const {
    reloadEvents,
    state: {
      events: { items: events, loading },
    },
    loadEvents,
  } = useContext(AppContext);

  const renderEvents = () =>
    events.map((event: EventType) => (
      <PlainEvent event={event} key={event._id} />
    ));

  return (
    <View style={styles.container}>
      <RefreshButton pressCallback={reloadEvents} />

      {renderEvents()}

      <MoreButton
        title="Pokaż więcej"
        onPress={loadEvents}
        loading={loading}
        additionalStyles={styles.moreButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    marginBottom: 20,
  },
  moreButton: {
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 5,
    marginBottom: 20,
    backgroundColor: "#7400b8",
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderColor: "#ffddd2",
  },
});

export default AllEvents;
