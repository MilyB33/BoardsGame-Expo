import React from 'react';
import useOptions from '../../hooks/useOptions';

import OptionActionWrapper from '../Generic/OptionActionWrapper';
import Options from './Options';

const initialState = {};

const ContactsWrapper = () => {
  const { options, toggleOption } = useOptions(initialState);

  return (
    <>
      <Options handleOptionChange={toggleOption} />
      <OptionActionWrapper options={options} />
    </>
  );
};

export default ContactsWrapper;
