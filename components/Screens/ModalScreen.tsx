import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components';
import LoginModal from '../Modals/LoginModal';

interface Props {
  route: any;
}

const ModalContainer = styled(View)`
  flex: 1;
  justify-content: center;
`;

const ModalScreen: React.FC<Props> = ({ route }) => {
  const { modalType } = route.params;

  const renderModal = modalType === 'login' ? <LoginModal /> : null;

  return <ModalContainer>{renderModal}</ModalContainer>;
};

export default ModalScreen;
