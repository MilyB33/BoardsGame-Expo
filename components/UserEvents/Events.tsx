import React, { useContext, useEffect } from "react";

import { UserContext } from "../../context/userContext";
import UserEvent from "./UserEvent";
import UserSignedEvent from "./UserSignedEvent";
import ScrollContainer from "./ScrollContainer";
// This components probably should be a HOC to avoid repetition (TODO)
const UserEvents = () => {
  const { user } = useContext(UserContext);

  const {
    events: { userEvents, userSignedEvents },
  } = user;

  const isUserEvents = userEvents.length > 0;
  const isUserSignedEvents = userSignedEvents.length > 0;

  const renderUserEvents = () =>
    userEvents.map((event) => <UserEvent key={event._id} event={event} />);

  const renderUserSignedEvents = () =>
    userSignedEvents.map((event) => (
      <UserSignedEvent key={event._id} event={event} />
    ));

  useEffect(() => {
    console.log(user);
  }, []);

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
    </>
  );
};

export default UserEvents;
