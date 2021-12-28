import React from 'react';

import { View } from 'react-native';
import styles from './Forms.styles';
import { CustomInputProps } from '../../types/types';
import { getIn } from 'formik';
import { HelperText, TextInput } from 'react-native-paper';

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const {
    field: { name, onBlur, value },
    form: { errors, touched, setFieldTouched },
    label,
    placeholder,
    isSecure = false,
    keyboardType = 'default',
    isNumeric = false,

    setFieldValue,
  } = props;

  const hasError = Boolean(
    getIn(errors, name) && getIn(touched, name)
  );

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
        style={styles.input}
        onBlur={handleBlur}
        value={value.toString()}
        placeholder={placeholder}
        autoCapitalize="none"
        secureTextEntry={isSecure}
        keyboardType={keyboardType}
        right={isSecure && <TextInput.Icon name="eye" />}
        error={hasError}
      />
      <HelperText type="error" visible={hasError}>
        {getIn(errors, name)}
      </HelperText>
    </View>
  );
};

export default CustomInput;
