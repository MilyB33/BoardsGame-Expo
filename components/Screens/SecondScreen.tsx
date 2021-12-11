import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  navigation: any;
}

import ScreenLayout from '../Layout/ScreenLayout';

const SecondScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenLayout navigation={navigation}>
      <View>
        <Text style={{ color: 'white' }}>Second Screen</Text>
      </View>
    </ScreenLayout>
  );
};

export default SecondScreen;
