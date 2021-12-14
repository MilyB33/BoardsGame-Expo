import React from 'react';

import { View, ScrollView, StyleSheet } from 'react-native';

import styled from 'styled-components';

import { CustomBackground } from '../Layout/Layout.styles';
import Navigation from '../Navigation/Navigation';

interface Props {
  children: React.ReactNode;
}

const backgroundImage = require('../../assets/background.jpg');

const Container = styled(View)`
  flex: 1;
  height: 100%;
`;

const ScreenLayout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <CustomBackground source={backgroundImage} />
      <Navigation />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {children}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    minHeight: '90%',
  },
});

export default ScreenLayout;
