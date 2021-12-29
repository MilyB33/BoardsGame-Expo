import React, { useContext } from 'react';

import { UserContext } from '../../context/userContext';
import UserEvent from './UserEvent';
import UserSignedEvent from './UserSignedEvent';
import ScrollContainer from './ScrollContainer';
import ActivityIndicator from '../Generic/ActivityIndicator';
// This components probably should be a HOC to avoid repetition (TODO)
const UserEvents = () => {
  const { user } = useContext(UserContext);

  const renderUserEvents = () =>
    user.events.userEvents.items.map((event) => (
      <UserEvent key={event._id} event={event} />
    ));

  const renderUserSignedEvents = () =>
    user.events.userSignedEvents.items.map((event) => (
      <UserSignedEvent key={event._id} event={event} />
    ));

  return (
    <>
      <ScrollContainer header="Twoje Wydarzenia:">
        {user.events.userEvents.loading ? (
          <ActivityIndicator />
        ) : (
          renderUserEvents()
        )}
      </ScrollContainer>
      <ScrollContainer header="Wydarzenia w których uczestniczysz:">
        {user.events.userSignedEvents.loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          renderUserSignedEvents()
        )}
      </ScrollContainer>
    </>
  );
};

export default UserEvents;
