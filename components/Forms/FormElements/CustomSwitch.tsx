import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Switch, HelperText } from "react-native-paper";
import { getIn } from "formik";

import { CustomSwitchProps } from "../../../types/types";

const CustomSwitch: React.FC<CustomSwitchProps> = (props) => {
  const {
    field: { name, value },
    form: { errors, touched },
    label,
    setFieldValue,
  } = props;

  const hasError = Boolean(getIn(errors, name) && getIn(touched, name));

  const handleChange = (value: boolean) => {
    setFieldValue(name, value, true);
  };

  return (
    <View style={styles.switchContainer}>
      <Text style={styles.text}>{label}</Text>
      <Switch value={value} color="#00b4d8" onValueChange={handleChange} />
      <HelperText type="error" visible={hasError}>
        {getIn(errors, name)}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});

export default CustomSwitch;
