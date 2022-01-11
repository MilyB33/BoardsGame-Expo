import React from 'react';
import useOptions from '../../hooks/useOptions';

import OptionActionWrapper from '../Generic/OptionActionWrapper';
import Options from './Options';
import List from './List';
import SearchUser from './SearchUser';

const initialState = {
  list: {
    visible: false,
    component: List,
  },
  search: {
    visible: false,
    component: SearchUser,
  },
};

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
