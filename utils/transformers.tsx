import { EventFormState } from '../types/types';

export const transformFormValues = (values: EventFormState) => {
  const day = checkLength(values.date.day);
  const month = checkLength(values.date.month);

  const hour = checkLength(values.time.hour);
  const minute = checkLength(values.time.minute);

  return {
    ...values,
    date: `${values.date.year}-${month}-${day}`,
    time: `${hour}:${minute}`,
    maxPlayers: values.maxPlayers,
  };
};

const checkLength = (value: number) =>
  value.toString().length === 1 ? `0${value}` : value.toString();
