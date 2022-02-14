import React from "react";

import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import Appbar from "../Appbar/Appbar";

interface PropTypes {
  isScroll?: boolean;
}

const backgroundImage = require("../../assets/background.jpg");

const ScreenLayout: React.FC<PropTypes> = ({ children, isScroll = true }) => {
  const ScrollContainer = isScroll ? ScrollView : View;

  const ScrollContainerProps = isScroll
    ? { contentContainerStyle: { ...styles.contentContainer } }
    : { style: { ...styles.container } };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.avoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground style={styles.background} source={backgroundImage} />
        <ScrollContainer {...ScrollContainerProps}>{children}</ScrollContainer>
        <Appbar />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    position: "relative",
  },
  container: {
    flex: 1,
  },
  avoid: {
    flex: 1,
  },
  background: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});

export default ScreenLayout;
