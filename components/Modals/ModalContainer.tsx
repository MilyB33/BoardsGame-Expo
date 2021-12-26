import React from 'react';
import CloseButton from '../Generic/CloseButton';

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './modals.style';

interface Props {
  children: React.ReactNode;
}

const LoginContainer: React.FC<Props> = ({ children }) => {
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={{ flex: 1 }}
    // >
    <View style={styles.modalContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <CloseButton />
        {children}
      </ScrollView>
    </View>
    // </KeyboardAvoidingView>
  );
};

export default LoginContainer;
