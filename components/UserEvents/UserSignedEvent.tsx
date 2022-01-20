import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";

import { ActivityIndicator } from "react-native";
import Event from "../Event/Event";
import EventButton from "../Generic/EventButton";

import { Event as EventType } from "../../types/types";

interface Props {
  event: EventType;
}

const UserSignedEvent: React.FC<Props> = ({ event }) => {
  const { signOutUserFromEvent } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await signOutUserFromEvent(event._id);
    // There is no need to set loading to false, because component will be unmounted
  };

  const renderButton = loading ? (
    <ActivityIndicator size="large" color="white" />
  ) : (
    <EventButton title="Wypisz się" onPress={handleDelete} color="#e63946" />
  );

  return <Event event={event} Button={renderButton} />;
};

export default UserSignedEvent;
