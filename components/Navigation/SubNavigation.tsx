import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/userContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { View, Text, TouchableOpacity } from 'react-native';

import { RootStackParamList } from '../../types/types';
import { getColor } from '../../styles/utils';
import styled from 'styled-components';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'UserEvents' | 'Home'
>;

interface Props {
  closeMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  background: ${getColor('primary')};
  padding: 0px 5px;
`;

const NavigationItem = styled(Text)`
  color: ${getColor('white')};
  margin: 0 8px;
  padding: 10px 0;
  width: 70px;
  font-size: 12px;
  text-align: center;
`;

const SubNavigation: React.FC<Props> = ({ closeMenu }) => {
  const { logout } = useContext(UserContext);
  const navigation = useNavigation<NavigationProps>();

  const handleLogout = () => {
    closeMenu(false);
    logout();
    navigation.navigate('Home');
  };

  return (
    <NavigationContainer>
      <TouchableOpacity>
        <NavigationItem>Znajomi</NavigationItem>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('UserEvents')}
      >
        <NavigationItem>Twoje Wydarzenia</NavigationItem>
      </TouchableOpacity>
      <TouchableOpacity>
        <NavigationItem>Ulubione gry</NavigationItem>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginLeft: 'auto' }}
        onPress={handleLogout}
      >
        <NavigationItem>Wyloguj</NavigationItem>
      </TouchableOpacity>
    </NavigationContainer>
  );
};

export default SubNavigation;
