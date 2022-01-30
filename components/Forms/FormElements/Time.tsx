import React from "react";

import { StyleSheet, Text } from "react-native";

import { DateFieldProps } from "../../../types/types";
import { checkLength } from "../../../utils/transformers";

const Time: React.FC<DateFieldProps> = (props) => {
  const {
    field: { value },
  } = props;

  const hours = checkLength(value.getHours());
  const minutes = checkLength(value.getMinutes());

  return <Text style={styles.dateBox}>{`${hours} : ${minutes}`}</Text>;
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

export default Time;
