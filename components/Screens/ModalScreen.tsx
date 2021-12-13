import React from 'react';
import { ScrollView, View } from 'react-native';

import styled from 'styled-components';
import LoginModal from '../Modals/LoginModal';

const ModalContainer = styled(View)`
  flex: 1;
`;

const ModalScreen = () => {
  return (
    <ModalContainer>
      <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
        <LoginModal />
      </ScrollView>
    </ModalContainer>
  );
};

export default ModalScreen;
