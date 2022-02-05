import React from "react";

import { View, StyleSheet, Animated, Easing } from "react-native";
import { IconButton } from "react-native-paper";

interface Props {
  pressCallback(): Promise<void>;
}

const RefreshButton: React.FC<Props> = ({ pressCallback }) => {
  const spinValue = new Animated.Value(0);

  spinValue.setValue(0);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  const startAnimation = () => {
    spinValue.setValue(0);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start(() => startAnimation());
  };

  const stopAnimation = () => {
    spinValue.stopAnimation();
  };

  const handlePress = () => {
    startAnimation();

    // setTimeout trick to make sure the animation starts before the callback
    setTimeout(async () => {
      await pressCallback();
      stopAnimation();
    }, 0);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <IconButton icon="sync" onPress={handlePress} color="white" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 30,
    bottom: "99%",
    backgroundColor: "dodgerblue",

    borderRadius: 50,
  },
});

export default RefreshButton;
