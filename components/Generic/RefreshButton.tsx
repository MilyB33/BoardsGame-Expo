import React from 'react';

import { View, StyleSheet, Animated, Easing } from 'react-native';
import { IconButton } from 'react-native-paper';

interface Props {
  pressCallback(): Promise<void>;
}

const RefreshButton: React.FC<Props> = ({ pressCallback }) => {
  const spinValue = new Animated.Value(0);

  spinValue.setValue(0);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
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

  const handlePress = async () => {
    // I think this is working but get 304 response so I don't know
    startAnimation();
    pressCallback();
    stopAnimation();
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
    position: 'absolute',
    right: 30,
    bottom: '99.5%',
    backgroundColor: 'dodgerblue',

    borderRadius: 50,
  },
});

export default RefreshButton;

{
  /* <Animated.View style={{ transform: [{ rotate: spin }] }}>
<TouchableOpacity onPress={handlePress}>
  <FontAwesomeIcon icon={faSyncAlt} size={24} color="white" />
</TouchableOpacity>
</Animated.View> */
}
