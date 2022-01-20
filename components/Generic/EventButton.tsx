import React from "react";

import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";

interface Props {
  disabled?: boolean;
  title: string;
  additionalStyle?: any;
  onPress: () => void;
  color?: string;
}

const EventButton: React.FC<Props> = ({
  title,
  disabled,
  onPress,
  color,
  additionalStyle = {},
}) => {
  return (
    <Button
      mode="contained"
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        disabled && styles.disabled,
        color ? { backgroundColor: color } : {},
        additionalStyle,
      ]}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  error: {
    backgroundColor: "red",
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  disabled: {
    backgroundColor: "grey",
  },
});

export default EventButton;
