import React from 'react';

import { View, Text, ScrollView, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
  header?: string;
}

const ScrollContainer: React.FC<Props> = ({ children, header }) => (
  <View style={styles.container}>
    {header && <Text style={styles.text}>{header}</Text>}
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      horizontal={true}
    >
      {children}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    minWidth: '100%',
  },
  scrollContainer: {
    minWidth: '100%',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    maxWidth: '80%',
    backgroundColor: 'rgba(86,79,79,.6)',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    borderRadius: 15,
  },
});

export default ScrollContainer;
