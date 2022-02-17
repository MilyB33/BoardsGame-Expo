import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../storage/App/hooks";
import {
  signUserForEvent,
  signOutUserFromEvent,
} from "../../storage/Slices/userSlice";

import Event from "../Event/Event";
import EventButton from "../Generic/EventButton";
import ActivityIndicator from "../Generic/ActivityIndicator";

import { Event as EventType } from "../../types/types";

interface PropTypes {
  event: EventType;
}

const PlainEvent = ({ event }: PropTypes) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, _id: userId } = useAppSelector(
    (state) => state.user
  );

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (isAuthenticated) {
      setLoading(true);
      await dispatch(signUserForEvent(event._id));
      setLoading(false);
    } else {
      alert("Musisz być zalogowany aby zapisać się na wydarzenie");
    }
  };

  const handleSignOut = async () => {
    if (isAuthenticated) {
      setLoading(true);
      await dispatch(signOutUserFromEvent(event._id));
      setLoading(false);
    }
  };

  const renderButton = () => {
    switch (true) {
      case loading:
        return <ActivityIndicator />;
      case event.createdBy._id === userId:
        return (
          <EventButton
            title="Twoje wydarzenie"
            onPress={() => {}}
            disabled={true}
          />
        );
      case event.signedUsers.map((user) => user._id).includes(userId):
        return <EventButton title="Wypisz się" onPress={handleSignOut} />;
      case Number(event.maxPlayers) === event.signedUsers.length:
        return (
          <EventButton
            title="Wydarzenie zapełnione"
            onPress={handleSignOut}
            disabled={true}
          />
        );
      default:
        return <EventButton title="Zapisz się" onPress={handleSignUp} />;
    }
  };

  return <Event event={event} Button={renderButton()} />;
};

export default PlainEvent;
