import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { Event } from '../../types/types';

interface Props {
  event: Event;
}

const EventInfo: React.FC<Props> = ({ event }) => {
  return (
    <View>
      <Text style={styles.text}>Miejsce: {event.location}</Text>

      <Text style={styles.text}>Miasto: {event.town}</Text>

      <Text style={styles.text}>
        Organizator: {event.createdBy.username}
      </Text>

      <Text style={styles.text}>Gra: {event.game}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.text}>Data: {event.date}</Text>
        <Text style={styles.text}>Godzina: {event.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: 'white',
    margin: 5,
  },
  infoBox: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default EventInfo;
