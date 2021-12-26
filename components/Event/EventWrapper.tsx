import React from 'react';

import { View, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const EventWrapper: React.FC<Props> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: 15,
    padding: 15,
    minHeight: 100,
    borderRadius: 5,
    backgroundColor: 'rgba(86,79,79,.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.4)',
    minWidth: '80%',
  },
});

export default EventWrapper;
