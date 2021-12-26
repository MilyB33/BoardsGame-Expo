import React, { useContext } from 'react';

import { AppContext } from '../../context/appContext';

import {
  View,
  ActivityIndicator,
  StyleSheet,
  Button,
} from 'react-native';
import PlainEvent from './PlainEvent';
import RefreshButton from '../Generic/RefreshButton';
import { Event as EventType } from '../../types/types';

const AllEvents = () => {
  const {
    reloadEvents,
    state: {
      events: { items: events, loading },
    },
  } = useContext(AppContext);

  const renderEvents = () =>
    events.map((event: EventType) => (
      <PlainEvent event={event} key={event._id} />
    ));

  return (
    <View style={styles.container}>
      <RefreshButton pressCallback={reloadEvents} />

      {renderEvents()}

      {loading && (
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color="white"
        />
      )}

      {loading || (
        <View style={styles.moreButton}>
          <Button title="Pokaż więcej" onPress={() => {}} />
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
  },
  moreButton: {
    marginTop: 'auto',
  },
});

export default AllEvents;
