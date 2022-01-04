import React from 'react';

import { View, ScrollView, StyleSheet } from 'react-native';
import Modals from '../Modals/Modals';
import Appbar from '../Appbar/Appbar';

import { CustomBackground } from '../Layout/Layout.styles';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const backgroundImage = require('../../assets/background.jpg');

const Container = styled(View)`
  flex: 1;
  height: 100%;
  position: relative;
`;

const ScreenLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Container>
        <CustomBackground source={backgroundImage} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {children}
        </ScrollView>
        <Modals />
        <Appbar />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    minHeight: '100%',
  },
});

export default ScreenLayout;
