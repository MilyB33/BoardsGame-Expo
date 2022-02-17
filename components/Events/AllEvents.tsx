import React from "react";
import { useAppSelector, useAppDispatch } from "../../storage/App/hooks";
import {
  reloadItems,
  expandEvents,
  selectAllEvents,
} from "../../storage/Slices/appSlice";

import { View, StyleSheet } from "react-native";
import PlainEvent from "./PlainEvent";
import RefreshButton from "../Generic/RefreshButton";
import MoreButton from "../Generic/MoreButton";

import { Event as EventType } from "../../types/types";

const AllEvents = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllEvents);
  const { loading } = useAppSelector((state) => state.app.events);

  const renderEvents = () =>
    events.map((event: EventType) => (
      <PlainEvent event={event} key={event._id} />
    ));

  const eventsCount = events.length > 0;

  return (
    <View style={styles.container}>
      <RefreshButton pressCallback={() => dispatch(expandEvents())} />

      {renderEvents()}

      {eventsCount && (
        <MoreButton
          title="Pokaż więcej"
          onPress={() => dispatch(reloadItems())}
          loading={loading}
          additionalStyles={styles.moreButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
