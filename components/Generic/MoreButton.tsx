import React from "react";

import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import ActivityIndicator from "./ActivityIndicator";

interface Props {
  title: string;
  additionalStyles?: any;
  onPress: () => void;
  loading: boolean;
}

const MoreButton: React.FC<Props> = ({
  title,
  loading,
  additionalStyles,
  onPress,
}) => {
  return loading ? (
    <ActivityIndicator />
  ) : (
    <Button
      mode="contained"
      style={[styles.button, additionalStyles]}
      onPress={onPress}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {},
  indicator: {
    backgroundColor: "white",
  },
});

export default MoreButton;
