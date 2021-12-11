import React from 'react';
import { Text } from 'react-native';

import HomeInfo from '../HomeInfo';

import ScreenLayout from '../Layout/ScreenLayout';

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenLayout>
      <HomeInfo />
      <Text
        style={{
          color: 'white',
          textDecorationLine: 'underline',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        onPress={() => navigation.navigate('Second')}
      >
        Go Second
      </Text>
    </ScreenLayout>
  );
};

export default HomeScreen;
