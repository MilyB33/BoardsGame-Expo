import React from 'react';

import Header from '../Generic/Header';
import ContactsWrapper from '../Contacts/ContactsWrapper';
import ScreenLayout from '../Layout/ScreenLayout';

const ContactsScreen = () => {
  return (
    <ScreenLayout isScroll={false}>
      <Header title="Kontakty" />
      <ContactsWrapper />
    </ScreenLayout>
  );
};

export default ContactsScreen;
