import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';

import { StyleSheet, Button, ActivityIndicator } from 'react-native';

import EventWrapper from '../Event/EventWrapper';
import EventInfo from '../Event/EventInfo';
import EventFreePlaces from '../Event/EventFreePlaces';
import { Event } from '../../types/types';

interface Props {
  event: Event;
}

const UserSignedEvent: React.FC<Props> = ({ event }) => {
  const { signOutUserFromEvent } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await signOutUserFromEvent(event._id);
    // There is no need to set loading to false, because component will be unmounted
  };

  return (
    <EventWrapper>
      <EventInfo event={event} />

      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Button
          title="Wypisz się"
          onPress={handleDelete}
          color="#e63946"
        />
      )}

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
