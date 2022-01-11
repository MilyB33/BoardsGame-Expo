import React from 'react';

import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import ContactMenu from './ContactMenu';

import { User } from '../../types/types';

interface Props {
  user: User;
  isSearch?: boolean;
}

const ContactItem: React.FC<Props> = ({ user, isSearch = false }) => {
  const { _id, username } = user;

  return (
    <Surface style={styles.container}>
      <Text style={styles.text}>{username}</Text>

      <ContactMenu isSearch={isSearch} />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 2,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  messageButton: {
    marginLeft: 'auto',
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#212529',
  },
});

export default ContactItem;
