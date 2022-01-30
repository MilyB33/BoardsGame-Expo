import { EventFormState } from "../types/types";

type DateSeparators = "-" | "/" | ".";
type TimeSeparators = ":" | ".";
type ObjectType = { [key: string]: any };

export const transformFormValues = (values: EventFormState) => {
  const newValues = removeWhiteSpaces(values);

  return {
    ...newValues,
    date: formatDate(newValues.date, "-"),
    time: formatTime(newValues.time, ":"),
  };
};

export const removeWhiteSpaces = <T extends ObjectType>(values: T) => {
  for (let key in values) {
    if (values[key] && typeof values[key] === "string") {
      values[key] = values[key].trim();
    }
  }

  return values;
};

export const checkLength = (value: number) =>
  value < 10 ? `0${value.toString()}` : value.toString();

const formatDate = (date: Date, separator: DateSeparators) => {
  const day = checkLength(date.getDate());
  const month = checkLength(date.getMonth() + 1);
  const year = date.getFullYear();

  return [day, month, year].join(separator);
};

const formatTime = (date: Date, separator: TimeSeparators) => {
  const hours = checkLength(date.getHours());
  const minutes = checkLength(date.getMinutes());

  return [hours, minutes].join(separator);
};

export const formatToDate = (date: string, time: string) => {
  const dateSeparators = ["-", "/", "."];
  const timeSeparators = ["-", ":", "."];

  const dateSeparator = dateSeparators.find((separator) =>
    date.includes(separator)
  ) as DateSeparators;
  const timeSeparator = timeSeparators.find((separator) =>
    time.includes(separator)
  ) as TimeSeparators;

  const [day, month, year] = date.split(dateSeparator).map(Number);
  const [hours, minutes] = time.split(timeSeparator).map(Number);

  return new Date(year, month - 1, day, hours, minutes);
};

export const transformQuery = (parts: TemplateStringsArray, ...vars: any[]) => {
  let str = "";

  let partsArr = [...parts] as any[];

  str = `${parts.join("").slice(0, parts.join("").indexOf("?"))}`;

  if (vars.some((item: any) => typeof item !== "undefined" || item !== null))
    str += "?";
  else return str;

  partsArr[0] = parts[0].split("?")[1];

  partsArr.forEach((part: any, index: number) => {
    if (typeof vars[index] !== "undefined" && vars[index] !== null) {
      if (str.slice(str.length - 1, str.length) === "?")
        str += `${part.slice(0, part.length)}${vars[index]}`;
      else str += `${part.slice(0, part.length)}${vars[index]}`;
    }
  });

  return str;
};
