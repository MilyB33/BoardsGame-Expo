import React from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useAppDispatch } from "../../storage/App/hooks";
import { editEvent } from "../../storage/Slices/userSlice";

import EventForm from "./EventForm";

import { RootStackParamList, EventFormState } from "../../types/types";
import { formatToDate } from "../../utils/transformers";

type EditEventRouteProp = RouteProp<RootStackParamList, "EditEvent">;

const AddEventForm = () => {
  const dispatch = useAppDispatch();
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
    const eventData = {
      eventID: event._id,
      event: values,
    };

    const isAdded = await dispatch(editEvent(eventData)).then(
      (res) => res.payload
    );

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
