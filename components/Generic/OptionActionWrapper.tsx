import React from "react";

import { View, StyleSheet } from "react-native";

interface Props {
  customStyles?: {};
  children: React.ReactNode;
}

const FormWrapper: React.FC<Props> = ({ children, customStyles }) => {
  return <View style={customStyles || styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FormWrapper;
