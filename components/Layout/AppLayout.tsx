import React from 'react';

import { StatusBar } from 'react-native';
import { AppContainer } from './Layout.styles';
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
