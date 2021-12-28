import React from 'react';
import { AppContainer } from './Layout.styles';

import { StatusBar } from 'react-native';

import Navigation from '../Navigation';

const Layout = () => {
  return (
    <>
      <AppContainer>
        <StatusBar translucent backgroundColor="dodgerblue" />
        <Navigation />
      </AppContainer>
    </>
  );
};

export default Layout;
