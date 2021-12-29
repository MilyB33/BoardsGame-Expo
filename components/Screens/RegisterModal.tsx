import React from 'react';

import { ScrollView, View } from 'react-native';
import ModalContainer from '../Modals/ModalContainer';
import RegisterForm from '../Forms/RegisterForm';

const ModalScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
        <ModalContainer>
          <RegisterForm />
        </ModalContainer>
      </ScrollView>
    </View>
  );
};

export default ModalScreen;
