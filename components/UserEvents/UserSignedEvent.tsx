import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

import Event from "../Event/Event";
import EventButton from "../Generic/EventButton";
import WithLoading from "../../hoc/withLoading";

import { Event as EventType } from "../../types/types";

interface Props {
  event: EventType;
}

const ButtonWithLoading = WithLoading(EventButton);

const UserSignedEvent: React.FC<Props> = ({ event }) => {
  const { signOutUserFromEvent } = useContext(UserContext);

  const handleDelete = async () => {
    await signOutUserFromEvent(event._id);
  };

  const Button = (
    <ButtonWithLoading
      title="Wypisz się"
      onPress={handleDelete}
      color="#e63946"
    />
  );

  return <Event event={event} Button={Button} />;
};

export default UserSignedEvent;
