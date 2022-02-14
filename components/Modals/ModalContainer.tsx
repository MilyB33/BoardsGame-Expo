import React from "react";

import CloseButton from "../Generic/CloseButton";
import { View, ScrollView, StyleSheet } from "react-native";

interface PropTypes {
  isScrolled?: boolean;
}

const LoginContainer: React.FC<PropTypes> = ({
  children,
  isScrolled = true,
}) => {
  const Container = isScrolled ? ScrollView : View;

  const containerProps = isScrolled
    ? {
        contentContainerStyle: styles.scrollViewContainer,
      }
    : { style: styles.scrollViewContainer };

  return (
    <View style={styles.modalContainer}>
      <Container {...containerProps}>
        <CloseButton />
        {children}
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButtonContainer: {
    bottom: 100,
  },
  icon: {
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.9)",
    paddingVertical: 15,
    minHeight: "100%",
  },
  scrollViewContainer: {
    width: "100%",
    minHeight: "100%",
    justifyContent: "center",
  },
});

export default LoginContainer;
