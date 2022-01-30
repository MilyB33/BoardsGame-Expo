import React from "react";

import SearchUserButton from "./SearchUserButton";
import FriendsWrapper from "./FriendsWrapper";

const ContactsWrapper = () => {
  return (
    <>
      <SearchUserButton small />
      <FriendsWrapper />
    </>
  );
};

export default ContactsWrapper;
