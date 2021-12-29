import React, { useContext } from 'react';
import { AppContext } from '../../context/appContext';

import { View, StyleSheet, Button } from 'react-native';
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

      {loading && <ActivityIndicator style={styles.spinner} />}

      {loading || (
        <View style={styles.moreButton}>
          <Button title="Pokaż więcej" onPress={loadEvents} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    marginTop: 50,
    marginBottom: 50,
  },
  moreButton: {
    marginTop: 'auto',
  },
});

export default AllEvents;
