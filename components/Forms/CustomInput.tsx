import React, { useState } from "react";

import { View } from "react-native";
import styles from "./Forms.styles";
import { getIn } from "formik";
import { HelperText, TextInput } from "react-native-paper";

import { CustomInputProps } from "../../types/types";

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const [isSecuredVisible, setIsSecuredVisible] = useState(false);
  const {
    field: { name, onBlur, value },
    form: { errors, touched, setFieldTouched },
    label,
    isSecure = false,
    keyboardType = "default",
    isNumeric = false,
    multiline = false,
    setFieldValue,
  } = props;

  const hasError = Boolean(getIn(errors, name) && getIn(touched, name));

  const handleChange = (text: string | number) => {
    if (isNumeric) text = Number(text);

    setFieldValue(name, text, true);
  };
  const handleBlur = () => {
    setFieldTouched(name);
    onBlur(name);
  };

  return (
    <View>
      <TextInput
        label={label}
        mode="outlined"
        onChangeText={handleChange}
        style={[styles.input, isNumeric && styles.numericInput]}
        onBlur={handleBlur}
        value={value.toString()}
        placeholder={label}
        autoCapitalize="none"
        secureTextEntry={isSecure && !isSecuredVisible}
        keyboardType={keyboardType}
        right={
          isSecure && (
            <TextInput.Icon
              name="eye"
              onPress={() => setIsSecuredVisible(!isSecuredVisible)}
            />
          )
        }
        error={hasError}
        multiline={multiline}
      />
      <HelperText type="error" visible={hasError}>
        {getIn(errors, name)}
      </HelperText>
    </View>
  );
};

export default CustomInput;
