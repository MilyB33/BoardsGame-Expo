import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { AuthContext } from "../../context/authContext";

import { StyleSheet } from "react-native";
import Event from "../Event/Event";
import EventButton from "../Generic/EventButton";
import CustomActivityIndicator from "../Generic/ActivityIndicator";

import { Event as EventType } from "../../types/types";

interface Props {
  event: EventType;
}

const PlainEvent: React.FC<Props> = ({ event }) => {
  const { signUserForEvent, signOutUserFromEvent } = useContext(UserContext);
  const {
    authState: { isAuthenticated, _id: userId },
  } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (isAuthenticated) {
      setLoading(true);
      await signUserForEvent(event._id);
      setLoading(false);
    } else {
      alert("Musisz być zalogowany aby zapisać się na wydarzenie");
    }
  };

  const handleSignOut = async () => {
    if (isAuthenticated) {
      setLoading(true);
      await signOutUserFromEvent(event._id);
      setLoading(false);
    }
  };

  const renderButton = () => {
    switch (true) {
      case loading:
        return <CustomActivityIndicator />;
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

const styles = StyleSheet.create({
  error: {
    backgroundColor: "red",
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  disabled: {
    backgroundColor: "grey",
  },
});

export default PlainEvent;
