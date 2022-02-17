import React from "react";
import { useAppDispatch } from "../../storage/App/hooks";
import { addEvent } from "../../storage/Slices/userSlice";

import EventForm from "./EventForm";

import { EventFormState } from "../../types/types";

const AddEventForm = () => {
  const dispatch = useAppDispatch();

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
    const isAdded = await dispatch(addEvent(values)).then((res) => res.payload);
    console.log(isAdded);
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
