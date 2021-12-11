import React from 'react';

import { View, ScrollView, StyleSheet } from 'react-native';

import styled from 'styled-components';

import { CustomBackground } from '../Layout/Layout.styles';

interface Props {
  children: React.ReactNode;
}

const backgroundImage = require('../../assets/background.jpg');

const Container = styled(View)`
  flex: 1;
  height: 100%;
  justify-content: center;
`;

const ScreenLayout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <CustomBackground source={backgroundImage} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {children}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    minHeight: '100%',
    justifyContent: 'center',
  },
});

export default ScreenLayout;
