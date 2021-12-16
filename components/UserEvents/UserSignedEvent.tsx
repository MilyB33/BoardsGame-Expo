import React from 'react';

import { View, StyleSheet, Button } from 'react-native';

import EventWrapper from '../Event/EventWrapper';
import EventInfo from '../Event/EventInfo';
import EventFreePlaces from '../Event/EventFreePlaces';
import { Event } from '../../types/types';

interface Props {
  event: Event;
}

const UserSignedEvent: React.FC<Props> = ({ event }) => {
  return (
    <EventWrapper>
      <EventInfo event={event} />

      <Button title="Wypisz się" onPress={() => {}} color="#e63946" />

      <EventFreePlaces event={event} />
    </EventWrapper>
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

export default UserSignedEvent;
