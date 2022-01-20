import React from "react";

import { View } from "react-native";
import ModalContainer from "../Modals/ModalContainer";
import UserEventsModal from "../Modals/UserEventsModal";

const UserEventsModalScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ModalContainer isScrolled={false}>
        <UserEventsModal />
      </ModalContainer>
    </View>
  );
};

export default UserEventsModalScreen;
