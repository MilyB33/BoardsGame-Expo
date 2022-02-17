import React from "react";

import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import ActivityIndicator from "./ActivityIndicator";

import { LoadingType } from "../../types/types";

interface PropTypes {
  title: string;
  additionalStyles?: any;
  onPress(): Promise<any>;
  loading: LoadingType;
}

const MoreButton = ({
  title,
  loading,
  additionalStyles,
  onPress,
}: PropTypes) => {
  return loading === "loading" ? (
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
