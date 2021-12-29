import React from 'react';

import { ScrollView, View } from 'react-native';
import ModalContainer from '../Modals/ModalContainer';
import AddEventForm from '../Forms/AddEventForm';

const AddEventScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
        <ModalContainer>
          <AddEventForm />
        </ModalContainer>
      </ScrollView>
    </View>
  );
};

export default AddEventScreen;
