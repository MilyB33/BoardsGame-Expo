import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

interface Props {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

const CustomSnackbar: React.FC<Props> = ({ message, visible, onDismiss }) => {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        action={{
          label: "OK",
          onPress: onDismiss,
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomSnackbar;
