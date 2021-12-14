import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { getColor } from '../../styles/utils';
import { AuthContext } from '../../context/authContext';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Home' | 'Events' | 'Modal'
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
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProps>();

  const handleLogout = () => {
    closeMenu(false);
    logout();
  };

  return (
    <NavigationContainer>
      <TouchableOpacity>
        <NavigationItem>Znajomi</NavigationItem>
      </TouchableOpacity>
      <TouchableOpacity>
        <NavigationItem>Twoje Wydarzenia</NavigationItem>
      </TouchableOpacity>
      <TouchableOpacity>
        <NavigationItem>Ulubione gry</NavigationItem>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginLeft: 'auto' }}
        onPress={handleLogout}
      >
        <NavigationItem>Ustawienia</NavigationItem>
      </TouchableOpacity>
    </NavigationContainer>
  );
};

export default SubNavigation;
