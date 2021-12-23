import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import AddEventModal from '../Modals/AddEventModal';

const AddEventScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
        <AddEventModal />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.9)',
  },
});

export default AddEventScreen;
