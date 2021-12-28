import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Typography } from '../Typography/Typography.styles';
import { Surface } from 'react-native-paper';

interface Props {
  text: string;
  link?: React.ReactNode;
  additional?: React.ReactNode;
}

const InfoBox: React.FC<Props> = ({ text, link, additional }) => {
  return (
    <Surface style={styles.container}>
      <Typography>{text}</Typography>
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
});

export default InfoBox;
