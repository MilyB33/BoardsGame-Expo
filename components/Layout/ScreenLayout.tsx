import React from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modals from '../Modals/Modals';
import Appbar from '../Appbar/Appbar';

import { CustomBackground } from '../Layout/Layout.styles';

interface Props {
  children: React.ReactNode;
  isScroll?: boolean;
}

const backgroundImage = require('../../assets/background.jpg');

const ScreenLayout: React.FC<Props> = ({
  children,
  isScroll = true,
}) => {
  const ScrollContainer = isScroll ? ScrollView : View;
  const ScrollContainerProps = isScroll
    ? { contentContainerStyle: { ...styles.contentContainer } }
    : { style: { ...styles.container } };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.avoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <CustomBackground source={backgroundImage} />
        <ScrollContainer {...ScrollContainerProps}>
          {children}
        </ScrollContainer>
        <Modals />
        <Appbar />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    minHeight: '100%',
  },
  container: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  avoid: {
    flex: 1,
  },
});

export default ScreenLayout;
