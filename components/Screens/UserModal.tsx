import React, { useState } from 'react';

import { ScrollView, View } from 'react-native';
import ModalContainer from '../Modals/ModalContainer';
import LoginForm from '../Forms/LoginForm';
import RegisterForm from '../Forms/RegisterForm';

const ModalScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
        <ModalContainer>
          {isLogin ? (
            <LoginForm changeForm={setIsLogin} />
          ) : (
            <RegisterForm changeForm={setIsLogin} />
          )}
        </ModalContainer>
      </ScrollView>
    </View>
  );
};

export default ModalScreen;
