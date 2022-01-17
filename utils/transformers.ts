import { EventFormState } from "../types/types";

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

export const transformQuery = (parts: TemplateStringsArray, ...vars: any[]) => {
  let str = "";

  let partsArr = [...parts] as any[];

  str = `${parts.join("").slice(0, parts.join("").indexOf("?"))}`;

  // Check this
  if (vars.some((item: any) => item === undefined || item === null)) str += "?";
  else return str;

  partsArr[0] = parts[0].split("?")[1];

  partsArr.forEach((part: any, index: number) => {
    if (vars[index]) {
      if (str.slice(str.length - 1, str.length) === "?")
        str += `${part.slice(1, part.length)}`;
      else str += `${part.slice(1, part.length)}${vars[index]}`;
    }
  });

  return str;
};

const checkLength = (value: number) =>
  value.toString().length === 1 ? `0${value}` : value.toString();

// Function to checking if property in object is readonly (from https://stackoverflow.com/questions/54724875/can-we-check-whether-property-is-readonly)
export function isWritable<T extends Object>(obj: T, key: keyof T): boolean {
  const desc = Object.getOwnPropertyDescriptor(obj, key) || {};
  return Boolean(desc.writable);
}
