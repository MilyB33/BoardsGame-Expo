import React, { useContext } from 'react';

import { UserContext } from '../../context/userContext';
import UserEvent from './UserEvent';
import UserSignedEvent from './UserSignedEvent';
import ScrollContainer from './ScrollContainer';
import ActivityIndicator from '../Generic/ActivityIndicator';
// This components probably should be a HOC to avoid repetition (TODO)
const UserEvents = () => {
  const { user } = useContext(UserContext);

  const {
    events: {
      userEvents: { loading: userEventsLoading, items: userEvents },
      userSignedEvents: {
        loading: userSignedEventsLoading,
        items: userSignedEvents,
      },
    },
  } = user;

  const isUserEvents = userEvents.length > 0;
  const isUserSignedEvents = userSignedEvents.length > 0;

  const renderUserEvents = () =>
    userEvents.map((event) => (
      <UserEvent key={event._id} event={event} />
    ));

  const renderUserSignedEvents = () =>
    userSignedEvents.map((event) => (
      <UserSignedEvent key={event._id} event={event} />
    ));

  return (
    <>
      <ScrollContainer
        header="Twoje Wydarzenia:"
        isDisplayed={isUserEvents}
      >
        {userEventsLoading ? (
          <ActivityIndicator />
        ) : (
          renderUserEvents()
        )}
      </ScrollContainer>
      <ScrollContainer
        header="Wydarzenia w których uczestniczysz:"
        isDisplayed={isUserSignedEvents}
      >
        {userSignedEventsLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          renderUserSignedEvents()
        )}
      </ScrollContainer>
    </>
  );
};

export default UserEvents;
