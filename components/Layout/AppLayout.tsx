import React from 'react';
import { AppContainer } from './Layout.styles';

import Navigation from '../Navigation';

const Layout = () => {
  return (
    <>
      <AppContainer>
        <Navigation />
      </AppContainer>
    </>
  );
};

export default Layout;
