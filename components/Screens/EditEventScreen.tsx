import React from "react";

import { View } from "react-native";
import ModalContainer from "../Modals/ModalContainer";
import EditEventForm from "../Forms/EditEventForm";

const EditEventScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ModalContainer isScrolled={true}>
        <EditEventForm />
      </ModalContainer>
    </View>
  );
};

export default EditEventScreen;
