import React from 'react';
import useOptions from '../../hooks/useOptions';

import OptionActionWrapper from './OptionActionWrapper';
import Options from './Options';

const AccountWrapper = () => {
  const { options, toggleOption } = useOptions();

  return (
    <>
      <Options handleOptionChange={toggleOption} />
      <OptionActionWrapper options={options} />
    </>
  );
};

export default AccountWrapper;
