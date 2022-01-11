import React from 'react';

import Header from '../Generic/Header';
import ContactsWrapper from '../Contacts/ContactsWrapper';
import ScreenLayout from '../Layout/ScreenLayout';
import { ContactsContextProvider } from '../../context/contactsContext';
import WithContext from '../../hoc/withContext';

const WrapperWithContext = WithContext(
  ContactsWrapper,
  ContactsContextProvider
);

const ContactsScreen = () => {
  return (
    <ScreenLayout isScroll={false}>
      <Header title="Kontakty" />
      <WrapperWithContext />
    </ScreenLayout>
  );
};

export default ContactsScreen;
