import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useRoute, RouteProp } from "@react-navigation/native";

import EventForm from "./EventForm";

import { RootStackParamList, EventFormState } from "../../types/types";
import { formatToDate } from "../../utils/transformers";

type EditEventRouteProp = RouteProp<RootStackParamList, "EditEvent">;

const AddEventForm = () => {
  const { editEvent } = useContext(UserContext);
  const route = useRoute<EditEventRouteProp>();

  const { event } = route.params;

  const eventDate = formatToDate(event.date, event.time);

  const initialValues: EventFormState = {
    location: event.location,
    description: event.description,
    date: eventDate,
    time: eventDate,
    game: event.game,
    town: event.town,
    maxPlayers: Number(event.maxPlayers),
    isPrivate: event.isPrivate,
  };

  const onSubmit = async (values: any) => {
    const isAdded = await editEvent(values, event._id);
    return isAdded;
  };

  return (
    <EventForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      buttonText="Zaktualizuj"
    />
  );
};

export default AddEventForm;
