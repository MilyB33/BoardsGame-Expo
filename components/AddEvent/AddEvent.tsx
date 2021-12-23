import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'AddEvent'
>;

const AddEventButton = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddEvent')}
        style={styles.button}
      >
        <FontAwesomeIcon icon={faPlus} size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'dodgerblue',
  },
});

export default AddEventButton;
