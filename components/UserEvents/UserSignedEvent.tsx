import React from "react";
import { useAppDispatch } from "../../storage/App/hooks";
import { signOutUserFromEvent } from "../../storage/Slices/userSlice";

import Event from "../Event/Event";
import EventButton from "../Generic/EventButton";
import WithLoading from "../../hoc/withLoading";

import { Event as EventType } from "../../types/types";

interface PropTypes {
  event: EventType;
}

const ButtonWithLoading = WithLoading(EventButton);

const UserSignedEvent = ({ event }: PropTypes) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    await dispatch(signOutUserFromEvent(event._id));
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
