import React from "react";

import { View } from "react-native";
import ModalContainer from "../Modals/ModalContainer";
import AddEventForm from "../Forms/AddEventForm";

const AddEventScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ModalContainer isScrolled={true}>
        <AddEventForm />
      </ModalContainer>
    </View>
  );
};

export default AddEventScreen;
