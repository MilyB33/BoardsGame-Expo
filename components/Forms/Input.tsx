import React from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from './Forms.styles';

interface Props {
  label: string;
  value: string;
  placeholder: string;
  onChange(value: string): void;
  isSecret: boolean;
}

const Input: React.FC<Props> = ({
  label,
  value,
  placeholder,
  onChange,
  isSecret,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
      />
    </View>
  );
};

export default Input;
