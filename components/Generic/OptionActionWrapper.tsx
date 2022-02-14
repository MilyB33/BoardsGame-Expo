import React from "react";

import { View, StyleSheet } from "react-native";

interface PropTypes {
  customStyles?: {};
}

const FormWrapper: React.FC<PropTypes> = ({ children, customStyles }) => {
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
