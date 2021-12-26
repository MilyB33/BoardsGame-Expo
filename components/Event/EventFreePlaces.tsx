import React, { useState } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Event } from '../../types/types';

interface Props {
  event: Event;
  changeView: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventInfo: React.FC<Props> = ({ event, changeView }) => {
  return (
    <View style={styles.freePlaces}>
      <TouchableOpacity onPress={() => changeView(true)}>
        <Text
          style={styles.text}
        >{`${event.signedUsers.length} / ${event.maxPlayers}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  text: {
    fontSize: 15,
    color: 'white',
    margin: 5,
  },
});

export default EventInfo;
