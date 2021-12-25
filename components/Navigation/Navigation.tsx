import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styled from 'styled-components';
import { getColor } from '../../styles/utils';
import { NavigationProps } from '../../types/types';
import { UserContext } from '../../context/userContext';
import SubNavigation from './SubNavigation';

const NavigationContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  background: ${getColor('primary')};
  padding: 0px 15px;
  border-bottom-width: 1px;
`;

const NavigationItem = styled(Text)`
  color: ${getColor('white')};
  margin: 0 15px;
  padding: 20px 0;
`;

const Navigation = () => {
  const [subOpen, setSubOpen] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const { user } = useContext(UserContext);

  return (
    <>
      <NavigationContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <NavigationItem>Strona Główna</NavigationItem>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Events')}
        >
          <NavigationItem>Wydarzenia</NavigationItem>
        </TouchableOpacity>
        {user.isAuthenticated ? (
          <TouchableOpacity
            style={{ marginLeft: 'auto' }}
            onPress={() => setSubOpen(!subOpen)}
          >
            <NavigationItem>{user.username}</NavigationItem>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ marginLeft: 'auto' }}
            onPress={() => navigation.navigate('UserModal')}
          >
            <NavigationItem>Zaloguj</NavigationItem>
          </TouchableOpacity>
        )}
      </NavigationContainer>
      {user.isAuthenticated && subOpen && (
        <SubNavigation closeMenu={setSubOpen} />
      )}
    </>
  );
};

export default Navigation;
