import React, { useContext, useEffect } from 'react';

import { AuthContext } from '../../context/authContext';
import UserEvent from './UserEvent';
import UserSignedEvent from './UserSignedEvent';
import ScrollContainer from './ScrollContainer';
// This components probably should be a HOC to avoid repetition (TODO)
const UserEvents = () => {
  const { user, getUserEvents, getUserSignedEvents } =
    useContext(AuthContext);

  const renderUserEvents = () =>
    user.userEvents.map((event) => (
      <UserEvent key={event._id} event={event} />
    ));

  const renderUserSignedEvents = () =>
    user.userSignedEvents.map((event) => (
      <UserSignedEvent key={event._id} event={event} />
    ));

  useEffect(() => {
    if (user.userEvents.length === 0) getUserEvents();
    if (user.userSignedEvents.length === 0) getUserSignedEvents();
  }, []);

  return (
    <>
      <ScrollContainer header="Twoje Wydarzenia:">
        {renderUserEvents()}
      </ScrollContainer>
      <ScrollContainer header="Wydarzenia w których uczestniczysz:">
        {renderUserSignedEvents()}
      </ScrollContainer>
    </>
  );
};

export default UserEvents;
