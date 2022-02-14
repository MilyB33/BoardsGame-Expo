import React from "react";

import { StyleSheet, Text } from "react-native";

import { DateFieldProps } from "../../../types/types";
import { checkLength } from "../../../utils/transformers";

const DateBox = (props: DateFieldProps) => {
  const {
    field: { value },
  } = props;

  const day = checkLength(value.getDate());
  const month = checkLength(value.getMonth() + 1);
  const year = checkLength(value.getFullYear());

  return <Text style={styles.dateBox}>{`${day} - ${month} - ${year}`}</Text>;
};

const styles = StyleSheet.create({
  dateBox: {
    fontSize: 20,
    borderBottomWidth: 3,
    borderColor: "dodgerblue",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 1,
    textAlign: "center",
  },
});

export default DateBox;
