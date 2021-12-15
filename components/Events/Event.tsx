import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { AppContext } from '../../context/appContext';

import { View, Text, StyleSheet, Button } from 'react-native';
import { Event as EventType } from '../../types/types';

interface Props {
  event: EventType;
}

const Event: React.FC<Props> = ({ event }) => {
  const {
    user: { isAuthenticated, id: userId },
  } = useContext(AuthContext);
  const { signUserForEvent, signOutUserFromEvent } =
    useContext(AppContext);

  const handleSignUp = () => {
    if (isAuthenticated) {
      signUserForEvent(event._id, userId);
    } else {
      alert('Musisz być zalogowany aby zapisać się na wydarzenie');
    }
  };

  const handleSignOut = () => {
    if (isAuthenticated) {
      signOutUserFromEvent(event._id, userId);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Miejsce: {event.location}</Text>

        <Text style={styles.text}>Miasto: {event.town}</Text>

        <Text style={styles.text}>
          Organizator: {event.createdBy}
        </Text>

        <Text style={styles.text}>Gra: {event.game}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.text}>Data: {event.date}</Text>
          <Text style={styles.text}>Godzina: {event.time}</Text>
        </View>
      </View>

      {event.signedUsers.includes(userId) ? (
        <Button
          color="#e63946"
          title="Wypisz się"
          onPress={handleSignOut}
          disabled={
            event.signedUsers.length === event.maxPlayers
              ? true
              : false
          }
        />
      ) : (
        <Button
          title="Zapisz się"
          onPress={handleSignUp}
          disabled={
            event.signedUsers.length === event.maxPlayers
              ? true
              : false
          }
        />
      )}

      <View style={styles.freePlaces}>
        <Text
          style={styles.text}
        >{`${event.signedUsers.length} / ${event.maxPlayers}`}</Text>
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
