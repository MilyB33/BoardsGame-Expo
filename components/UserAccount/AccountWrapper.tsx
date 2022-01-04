import React from 'react';
import useOptions from '../../hooks/useOptions';

import ChangePasswordForm from '../Forms/ChangePasswordForm';
import ChangeAccountDesc from '../Forms/ChangeAccountDesc';
import OptionActionWrapper from '../Generic/OptionActionWrapper';
import Options from './Options';

const initialState = {
  description: {
    visible: false,
    component: ChangeAccountDesc,
  },
  password: {
    visible: false,
    component: ChangePasswordForm,
  },
};

const AccountWrapper = () => {
  const { options, toggleOption } = useOptions(initialState);

  return (
    <>
      <Options handleOptionChange={toggleOption} />
      <OptionActionWrapper options={options} />
    </>
  );
};

export default AccountWrapper;
