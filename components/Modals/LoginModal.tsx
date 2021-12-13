import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { View, Text } from 'react-native';
import { getColor } from '../../styles/utils';
import LoginForm from '../Forms/LoginForm';
import RegisterForm from '../Forms/RegisterForm';
import styles from './loginModal.styles';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${getColor('modal')};
`;

const LoginModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

  return (
    <Container>
      <Text
        style={styles.closeButtonContainer}
        onPress={() => navigation.goBack()}
      >
        <FontAwesomeIcon icon={faTimes} color="white" size={32} />
      </Text>
      {isLogin ? (
        <LoginForm changeForm={setIsLogin} />
      ) : (
        <RegisterForm changeForm={setIsLogin} />
      )}
    </Container>
  );
};

export default LoginModal;
