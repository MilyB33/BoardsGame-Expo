import React from 'react';

import Header from '../Generic/Header';
import ChangePasswordForm from '../Forms/ChangePasswordForm';
import ScreenLayout from '../Layout/ScreenLayout';
import Options from '../UserAccount/Options';

const UserAccountScreen = () => {
  return (
    <ScreenLayout>
      <Header title="Konto" />
      <Options />
    </ScreenLayout>
  );
};

export default UserAccountScreen;
