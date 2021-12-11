import React from 'react';
import { View, Text } from 'react-native';

import ScreenLayout from '../Layout/ScreenLayout';

const SecondScreen = () => {
  return (
    <ScreenLayout>
      <View>
        <Text style={{ color: 'white' }}>Second Screen</Text>
      </View>
    </ScreenLayout>
  );
};

export default SecondScreen;
