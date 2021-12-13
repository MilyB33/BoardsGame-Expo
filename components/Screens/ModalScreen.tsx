import React from 'react';
import { ScrollView, View } from 'react-native';

import styled from 'styled-components';
import LoginModal from '../Modals/LoginModal';

interface Props {
  route: any;
}

const ModalContainer = styled(View)`
  flex: 1;
`;

const ModalScreen: React.FC<Props> = ({ route }) => {
  const { modalType } = route.params;

  const renderModal = modalType === 'login' ? <LoginModal /> : null;

  return (
    <ModalContainer>
      <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
        {renderModal}
      </ScrollView>
    </ModalContainer>
  );
};

export default ModalScreen;
