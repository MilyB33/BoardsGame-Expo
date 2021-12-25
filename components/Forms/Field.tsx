import React from 'react';

import { View, Text, TextInput } from 'react-native';

import styles from './Forms.styles';

interface Props {
  label?: string;
  onChangeCallback(e: string | React.ChangeEvent<any>): void;
  value: string | number;
  placeholder: string;
  error: string | undefined;
  touched: boolean | undefined;
  isSecure?: boolean;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad';
}

const Field: React.FC<Props> = ({
  label,
  onChangeCallback,
  value,
  placeholder,
  error,
  touched,
  isSecure = false,
  keyboardType = 'default',
}) => {
  return (
    <View>
      {label && <Text style={styles.label}>{`${label}:`}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={onChangeCallback}
        value={value.toString()}
        placeholder={placeholder}
        autoCapitalize="none"
        secureTextEntry={isSecure}
        keyboardType={keyboardType}
      />
      {error && touched && (
        <Text style={styles.errorField}>{error}</Text>
      )}
    </View>
  );
};

export default Field;
