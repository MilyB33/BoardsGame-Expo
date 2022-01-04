import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigation } from '@react-navigation/native';

import { StyleSheet } from 'react-native';
import { Surface, Portal } from 'react-native-paper';
import OptionItem from '../Generic/OptionItem';

import { NavigationProps } from '../../types/types';

interface Props {
  handleOptionChange: (option: string) => void;
}

const Options: React.FC<Props> = ({ handleOptionChange }) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <>
      <Surface style={styles.container}>
        <OptionItem
          title="Lista znajomych"
          icon="account-multiple"
          onPress={() => {}}
        />

        <OptionItem
          title="Szukaj znajomych"
          icon="account-search"
          buttonColor="#279927"
          onPress={() => {}}
        />
      </Surface>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    justifyContent: 'space-evenly',
  },
});

export default Options;
