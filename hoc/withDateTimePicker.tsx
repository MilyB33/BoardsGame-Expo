import React, { useState } from "react";

import { View, Platform, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import { DateFieldProps } from "../types/types";
import { getIn } from "formik";

type ComponentType = React.FC<DateFieldProps> | Function;

const WithDateTimePicker = (Component: ComponentType) => {
  return (props: DateFieldProps) => {
    const {
      field: { name, value },
      form: { errors },
      buttonText,
      setFieldValue,
      mode,
      label,
    } = props;

    const [show, setShow] = useState(false);

    const showMode = () => setShow(true);

    const onChange = (event: any, selectedDate: any) => {
      const currentDate = selectedDate || value;
      setShow(Platform.OS === "ios");
      setFieldValue(name, currentDate, true);
    };

    const hasError = Boolean(getIn(errors, name));

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{`${label}:`}</Text>
        <View style={styles.group}>
          <Component {...props} />
        </View>

        <Text>{hasError && getIn(errors, name)}</Text>

        <Button mode="contained" onPress={showMode}>
          <Text>{buttonText || "Wybierz datę"}</Text>
        </Button>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={value}
            display="default"
            mode={mode || "datetime"}
            onChange={onChange}
          />
        )}
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  group: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default WithDateTimePicker;
