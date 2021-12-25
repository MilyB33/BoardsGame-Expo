import React from 'react';
import { ScrollView, View } from 'react-native';

import ModalContainer from '../Modals/ModalContainer';
import EditEventForm from '../Forms/EditEventForm';

const EditEventScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
        <ModalContainer>
          <EditEventForm />
        </ModalContainer>
      </ScrollView>
    </View>
  );
};

export default EditEventScreen;
