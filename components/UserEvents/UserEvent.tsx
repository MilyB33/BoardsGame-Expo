import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { UserContext } from '../../context/userContext';

import { Event } from '../../types/types';
import EventInfo from '../Event/EventInfo';
import EventFreePlaces from '../Event/EventFreePlaces';
import EventWarpper from '../Event/EventWrapper';

interface Props {
  event: Event;
}

const UserEvent: React.FC<Props> = ({ event }) => {
  const { deleteUserEvent } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);

    Alert.alert(
      'Usuwanie wydarzenia',
      'Czy na pewno chcesz usunąć to wydarzenie?',
      [
        {
          text: 'Anuluj',
        },
        {
          text: 'Usuń',
          onPress: async () => {
            await deleteUserEvent(event._id);
            console.log('delete event');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <EventWarpper>
      <EventInfo event={event} />

      <View style={styles.operationBox}>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
            <View style={styles.button}>
              <Button
                title="Usuń"
                onPress={handleDelete}
                color="#e63946"
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Edytuj"
                onPress={() => {}}
                color="#2b9348"
              />
            </View>
          </>
        )}
      </View>

      <EventFreePlaces event={event} />
    </EventWarpper>
  );
};

const styles = StyleSheet.create({
  operationBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 5,
    flex: 1,
  },
});

export default UserEvent;
