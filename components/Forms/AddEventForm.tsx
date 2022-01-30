import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

import EventForm from "./EventForm";

import { EventFormState } from "../../types/types";

const AddEventForm = () => {
  const { addEvent } = useContext(UserContext);

  const TODAYS_DATE = new Date();

  const initialValues: EventFormState = {
    location: "",
    description: "",
    date: TODAYS_DATE,
    time: TODAYS_DATE,
    game: "",
    town: "",
    maxPlayers: 2,
    isPrivate: false,
  };

  const onSubmit = async (values: any) => {
    const isAdded = await addEvent(values);
    return isAdded;
  };

  return (
    <EventForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      buttonText="Dodaj"
    />
  );
};

export default AddEventForm;
