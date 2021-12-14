import React, { useEffect, useState, useContext } from 'react';
import ServerClient from '../../clients/serverClient';
import { AppContext } from '../../context/appContext';

import {
  View,
  ActivityIndicator,
  StyleSheet,
  Button,
} from 'react-native';
import Event from './Event';

interface EventType {
  date: string;
  time: string;
  game: string;
  description: string;
  place: string;
  createdAt: string;
  createdBy: string;
  _id: string;
}

const AllEvents = () => {
  const {
    state: {
      events: { items: events, loading },
    },
  } = useContext(AppContext);

  const renderEvents = () =>
    events.map((event: EventType) => (
      <Event event={event} key={event._id} />
    ));

  return (
    <View>
      {renderEvents()}

      {loading && (
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color="white"
        />
      )}

      {loading || <Button title="Pokaż więcej" onPress={() => {}} />}
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    marginTop: 50,
  },
});

export default AllEvents;
