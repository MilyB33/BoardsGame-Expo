import React, { ReactElement, useState } from "react";

import EventFreePlaces from "./EventFreePlaces";
import EventInfo from "./EventInfo";
import EventWrapper from "./EventWrapper";
import Participants from "./Participants";

import { Event as EventType } from "../../types/types";

interface Props {
  event: EventType;
  Button: Function | ReactElement;
}

const Event: React.FC<Props> = ({ event, Button }) => {
  const [isInfo, setIsInfo] = useState(false);

  return (
    <EventWrapper>
      {isInfo ? (
        <Participants users={event.signedUsers} changeView={setIsInfo} />
      ) : (
        <>
          <EventInfo event={event} />

          {Button}

          <EventFreePlaces event={event} changeView={setIsInfo} />
        </>
      )}
    </EventWrapper>
  );
};

export default Event;
