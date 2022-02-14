import React from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet } from "react-native";
import { IconButton, Colors, Surface } from "react-native-paper";

interface PropTypes {
  styles?: any;
}

const CloseButton = ({ styles }: PropTypes) => {
  const navigation = useNavigation();
  const handlePress = () => navigation.goBack();

  return (
    <Surface style={privateStyles.container}>
      <IconButton
        icon="close"
        onPress={handlePress}
        size={30}
        color={Colors.white}
        style={styles}
      />
    </Surface>
  );
};

const privateStyles = StyleSheet.create({
  container: {
    backgroundColor: "dodgerblue",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default CloseButton;
