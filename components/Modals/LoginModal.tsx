import React from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { View } from 'react-native';
import { getColor } from '../../styles/utils';
import { Typography } from '../Typography/Typography.styles';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${getColor('modal')};
`;

const LoginModal = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Typography>LoginModal</Typography>
      <Typography onPress={() => navigation.goBack()}>
        Close Modal
      </Typography>
    </Container>
  );
};

export default LoginModal;
