import React from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';

interface Props {
  event: {
    date: string;
    time: string;
    game: string;
    description: string;
    place: string;
    createdAt: string;
    createdBy: string;
    _id: string;
  };
}

const Event: React.FC<Props> = ({ event }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Miejsce: {event.place}</Text>

        <Text style={styles.text}>Miasto: {event.place}</Text>

        <Text style={styles.text}>
          Organizator: {event.createdBy}
        </Text>

        <Text style={styles.text}>Gra: {event.game}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.text}>Data: {event.date}</Text>
          <Text style={styles.text}>Godzina: {event.time}</Text>
        </View>
      </View>

      <Button title="Zapisz się" onPress={() => {}} />

      <View style={styles.freePlaces}>
        <Text style={styles.text}>1 / 4</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: 15,
    padding: 15,
    minHeight: 100,
    borderRadius: 5,
    backgroundColor: 'rgba(86,79,79,.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.4)',
  },
  infoBox: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    color: 'white',
    margin: 5,
  },
  freePlaces: {
    position: 'absolute',
    fontSize: 15,
    right: '10%',
    top: '10%',
    padding: 5,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: 'rgba(255,255,255,.2)',
  },
});

export default Event;
