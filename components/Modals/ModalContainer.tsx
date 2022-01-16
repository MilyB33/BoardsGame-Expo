import React from "react";

import CloseButton from "../Generic/CloseButton";
import { View, ScrollView } from "react-native";

import styles from "./modals.style";

interface Props {
  children: React.ReactNode;
  isScrolled?: boolean;
}

const LoginContainer: React.FC<Props> = ({ children, isScrolled = true }) => {
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

export default LoginContainer;
