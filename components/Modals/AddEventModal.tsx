import React from 'react';
import AddEventForm from '../Forms/AddEventForm';
import CloseButton from '../Generic/CloseButton';
import { View } from 'react-native';
import styles from './modals.style';

const AddEventModal = () => {
  return (
    <View style={styles.modalContainer}>
      <CloseButton styles={{ margin: 20 }} />
      <AddEventForm />
    </View>
  );
};

export default AddEventModal;
