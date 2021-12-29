import React from 'react';

import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';

interface Props {
  text: string;
  link?: React.ReactNode;
  additional?: React.ReactNode;
}

const InfoBox: React.FC<Props> = ({ text, link, additional }) => {
  return (
    <Surface style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {link}
      {additional}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 25,
    borderRadius: 10,
    backgroundColor: 'rgba(86,79,79,.6)',
    maxWidth: '90%',
    elevation: 10,
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default InfoBox;
