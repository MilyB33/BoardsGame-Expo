import React, { useContext } from 'react';
import { AppContext } from '../../context/appContext';

import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import PlainEvent from './PlainEvent';
import RefreshButton from '../Generic/RefreshButton';
import ActivityIndicator from '../Generic/ActivityIndicator';

import { Event as EventType } from '../../types/types';

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

      {loading ? (
        <ActivityIndicator style={styles.spinner} />
      ) : (
        <Button
          style={styles.moreButton}
          mode="contained"
          onPress={loadEvents}
        >
          Pokaż więcej
        </Button>
      )}
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
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 15,
    padding: 5,
    marginBottom: 20,
  },
});

export default AllEvents;
