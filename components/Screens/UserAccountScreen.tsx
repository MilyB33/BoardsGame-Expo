import React from 'react';

import Header from '../Generic/Header';
import AccountWrapper from '../UserAccount/AccountWrapper';
import ScreenLayout from '../Layout/ScreenLayout';

const UserAccountScreen = () => {
  return (
    <ScreenLayout>
      <Header title="Konto" />
      <AccountWrapper />
    </ScreenLayout>
  );
};

export default UserAccountScreen;
