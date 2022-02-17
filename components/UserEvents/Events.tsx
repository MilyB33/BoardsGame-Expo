import React from "react";
import { useAppSelector } from "../../storage/App/hooks";

import UserEvent from "./UserEvent";
import UserSignedEvent from "./UserSignedEvent";
import UserInviteEvent from "./UserInviteEvent";
import ScrollContainer from "./ScrollContainer";

const UserEvents = () => {
  const { userEvents, userSignedEvents, userInvitedEvents } = useAppSelector(
    (state) => state.user.events
  );

  const isUserEvents = userEvents.length > 0;
  const isUserSignedEvents = userSignedEvents.length > 0;
  const isUserInvitedEvents = userInvitedEvents.length > 0;

  const renderUserEvents = () =>
    userEvents.map((event) => <UserEvent key={event._id} event={event} />);

  const renderUserSignedEvents = () =>
    userSignedEvents.map((event) => (
      <UserSignedEvent key={event._id} event={event} />
    ));

  const renderUserInvitedEvents = () =>
    userInvitedEvents.map((event) => (
      <UserInviteEvent key={event._id} event={event} />
    ));

  return (
    <>
      <ScrollContainer header="Twoje Wydarzenia:" isDisplayed={isUserEvents}>
        {renderUserEvents()}
      </ScrollContainer>
      <ScrollContainer
        header="Wydarzenia w których uczestniczysz:"
        isDisplayed={isUserSignedEvents}
      >
        {renderUserSignedEvents()}
      </ScrollContainer>

      <ScrollContainer
        header="Wydarzenia w których jesteś zaproszony:"
        isDisplayed={isUserInvitedEvents}
      >
        {renderUserInvitedEvents()}
      </ScrollContainer>
    </>
  );
};

export default UserEvents;
