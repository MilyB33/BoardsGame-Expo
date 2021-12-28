import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../types/types';
import { FAB } from 'react-native-paper';

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
