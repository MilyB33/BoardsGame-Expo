import React, { useState } from 'react';
import CloseButton from '../Generic/CloseButton';

import { View } from 'react-native';
import LoginForm from '../Forms/LoginForm';
import RegisterForm from '../Forms/RegisterForm';
import styles from './modals.style';

const LoginModal = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.modalContainer}>
      <CloseButton styles={styles.closeButtonContainer} />
      {isLogin ? (
        <LoginForm changeForm={setIsLogin} />
      ) : (
        <RegisterForm changeForm={setIsLogin} />
      )}
    </View>
  );
};

export default LoginModal;
