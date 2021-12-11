import React from 'react';
import { View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

import styled from 'styled-components';

const Container = styled(View)``;

const PageContainer: React.FC<Props> = ({ children }) => (
  <Container>{children}</Container>
);

export default PageContainer;
