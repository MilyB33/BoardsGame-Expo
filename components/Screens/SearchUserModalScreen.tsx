import React from "react";

import { View } from "react-native";
import ModalContainer from "../Modals/ModalContainer";
import SearchUserModal from "../Modals/SearchUsersModal";

const SearchUserModalScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ModalContainer isScrolled={false}>
        <SearchUserModal />
      </ModalContainer>
    </View>
  );
};

export default SearchUserModalScreen;
