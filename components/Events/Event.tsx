import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { AppContext } from '../../context/appContext';

import { Button, ActivityIndicator } from 'react-native';
import { Event as EventType } from '../../types/types';
import EventInfo from '../Event/EventInfo';
import EventWrapper from '../Event/EventWrapper';
import EventFreePlaces from '../Event/EventFreePlaces';

interface Props {
  event: EventType;
}

const Event: React.FC<Props> = ({ event }) => {
  const {
    user: { isAuthenticated, id: userId },
  } = useContext(AuthContext);
  const { signUserForEvent, signOutUserFromEvent } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (isAuthenticated) {
      setLoading(true);
      await signUserForEvent(event._id, userId);
      setLoading(false);
    } else {
      alert('Musisz być zalogowany aby zapisać się na wydarzenie');
    }
  };

  const handleSignOut = async () => {
    if (isAuthenticated) {
      setLoading(true);
      await signOutUserFromEvent(event._id, userId);
      setLoading(false);
    }
  };

  const renderButton = () => {
    switch (true) {
      case loading:
        return <ActivityIndicator size="large" color="white" />;
      case event.createdBy === userId:
        return (
          <Button
            title="Twoje wydarzenie"
            onPress={handleSignOut}
            color="red"
            disabled={true}
          />
        );
      case event.signedUsers.includes(userId):
        return (
          <Button
            title="Wypisz się"
            onPress={handleSignOut}
            color="#e63946"
          />
        );
      case event.maxPlayers === event.signedUsers.length:
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

  return (
    <EventWrapper>
      <EventInfo event={event} />

      {renderButton()}

      <EventFreePlaces event={event} />
    </EventWrapper>
  );
};

export default Event;
