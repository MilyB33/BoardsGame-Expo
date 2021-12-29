import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

import { NavigationProps } from '../../types/types';

const AddEventButton = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <FAB
        icon="plus"
        onPress={() => navigation.navigate('AddEvent')}
        style={styles.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 10,
  },
  fab: {
    backgroundColor: 'dodgerblue',
  },
});

export default AddEventButton;
