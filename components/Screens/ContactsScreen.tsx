import React from "react";

import Header from "../Generic/Header";
import ContactsWrapper from "../Friends/ContactsWrapper";
import ScreenLayout from "../Layout/ScreenLayout";

const ContactsScreen = () => {
  return (
    <ScreenLayout isScroll={false}>
      <Header title="Znajomi" />
      <ContactsWrapper />
    </ScreenLayout>
  );
};

export default ContactsScreen;
