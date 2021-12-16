import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import { Event } from '../../types/types';
import EventInfo from '../Event/EventInfo';
import EventFreePlaces from '../Event/EventFreePlaces';
import EventWarpper from '../Event/EventWrapper';

interface Props {
  event: Event;
}

const UserEvent: React.FC<Props> = ({ event }) => {
  return (
    <EventWarpper>
      <EventInfo event={event} />

      <View style={styles.operationBox}>
        <View style={styles.button}>
          <Button title="Usuń" onPress={() => {}} color="#e63946" />
        </View>

        <View style={styles.button}>
          <Button title="Edytuj" onPress={() => {}} color="#2b9348" />
        </View>
      </View>

      <EventFreePlaces event={event} />
    </EventWarpper>
  );
};

const styles = StyleSheet.create({
  operationBox: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 5,
    flex: 1,
  },
});

export default UserEvent;
