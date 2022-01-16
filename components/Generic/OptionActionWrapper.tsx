import React from "react";

import { View, StyleSheet } from "react-native";

interface Props {
  options: {
    [key: string]: {
      visible: boolean;
      component: React.FC;
    };
  };
  customStyles?: {}; // I think I can't use object type like that
}

const FormWrapper: React.FC<Props> = ({ options, customStyles }) => {
  const renderOption = () => {
    for (const [key, value] of Object.entries(options)) {
      if (value.visible) {
        return <value.component />;
      }
    }
  };

  return <View style={customStyles || styles.container}>{renderOption()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FormWrapper;
