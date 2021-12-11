import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import styled from 'styled-components';
import { getColor } from '../../styles/utils';
import { RootStackParamList } from '../../types/types';

const NavigationContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  background: ${getColor('primary')};
  padding: 0px 15px;
`;

const NavigationItem = styled(Text)`
  color: ${getColor('white')};
  margin: 0 15px;
  padding: 20px 0;
`;

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Home' | 'Second' | 'Modal'
>;

const Navigation = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <NavigationContainer>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <NavigationItem>Strona Główna</NavigationItem>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Second')}>
        <NavigationItem>Wydarzenia</NavigationItem>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginLeft: 'auto' }}
        onPress={() =>
          navigation.navigate('Modal', {
            modalType: 'login',
          })
        }
      >
        <NavigationItem>Zaloguj</NavigationItem>
      </TouchableOpacity>
    </NavigationContainer>
  );
};

export default Navigation;
