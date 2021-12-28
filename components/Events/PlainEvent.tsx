import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';

import { Button, ActivityIndicator } from 'react-native';
import { Event as EventType } from '../../types/types';
import Event from '../Event/Event';

interface Props {
  event: EventType;
}

const PlainEvent: React.FC<Props> = ({ event }) => {
  const {
    user: { isAuthenticated, id: userId },
    signUserForEvent,
    signOutUserFromEvent,
  } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (isAuthenticated) {
      setLoading(true);
      await signUserForEvent(event._id);
      setLoading(false);
    } else {
      alert('Musisz być zalogowany aby zapisać się na wydarzenie');
    }
  };

  const handleSignOut = async () => {
    if (isAuthenticated) {
      setLoading(true);
      await signOutUserFromEvent(event._id);
      setLoading(false);
    }
  };

  const renderButton = () => {
    switch (true) {
      case loading:
        return <ActivityIndicator size="large" color="white" />;
      case event.createdBy._id === userId:
        return (
          <Button
            title="Twoje wydarzenie"
            onPress={handleSignOut}
            color="red"
            disabled={true}
          />
        );
      case event.signedUsers.map((user) => user._id).includes(userId):
        return (
          <Button
            title="Wypisz się"
            onPress={handleSignOut}
            color="#e63946"
          />
        );
      case Number(event.maxPlayers) === event.signedUsers.length:
        return (
          <Button
            title="Maksymalna ilość osób"
            onPress={handleSignOut}
            color="red"
            disabled={true}
          />
        );
      default:
        return <Button title="Zapisz się" onPress={handleSignUp} />;
    }
  };

  return <Event event={event} Button={renderButton()} />;
};

export default PlainEvent;
