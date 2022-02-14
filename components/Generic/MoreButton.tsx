import React from "react";

import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import ActivityIndicator from "./ActivityIndicator";

interface PropTypes {
  title: string;
  additionalStyles?: any;
  onPress: () => void;
  loading: boolean;
}

const MoreButton = ({
  title,
  loading,
  additionalStyles,
  onPress,
}: PropTypes) => {
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
