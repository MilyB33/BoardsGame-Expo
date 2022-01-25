import React from "react";

import { View } from "react-native";
import ModalContainer from "../Modals/ModalContainer";
import ChangePasswordModal from "../Modals/ChangePasswordModal";

const ChangePasswordModalScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ModalContainer isScrolled={false}>
        <ChangePasswordModal />
      </ModalContainer>
    </View>
  );
};

export default ChangePasswordModalScreen;
