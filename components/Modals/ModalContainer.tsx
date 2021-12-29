import React from 'react';

import CloseButton from '../Generic/CloseButton';
import { View, ScrollView } from 'react-native';

import styles from './modals.style';

interface Props {
  children: React.ReactNode;
}

const LoginContainer: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.modalContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <CloseButton />
        {children}
      </ScrollView>
    </View>
  );
};

export default LoginContainer;
