import React from 'react';

import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import OptionItem from '../Generic/OptionItem';

interface Props {
  handleOptionChange: (option: string) => void;
}

const Options: React.FC<Props> = ({ handleOptionChange }) => {
  return (
    <>
      <Surface style={styles.container}>
        <OptionItem
          title="Lista znajomych"
          icon="account-multiple"
          onPress={() => handleOptionChange('list')}
        />

        <OptionItem
          title="Szukaj znajomych"
          icon="account-search"
          buttonColor="#279927"
          onPress={() => handleOptionChange('search')}
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
