import React, { useContext } from 'react';
import { ContactsContext } from '../../context/contactsContext';

import { StyleSheet, FlatList } from 'react-native';
import { Surface, Divider, Text } from 'react-native-paper';
import ContactItem from './ContactItem';
import ActivityIndicator from '../Generic/ActivityIndicator';

const ContactsList = () => {
  const { state } = useContext(ContactsContext);

  const {
    users: { items: contacts },
  } = state;

  return (
    <Surface style={styles.list}>
      <Text style={styles.text}>Lista znajomych</Text>
      {contacts.length === 0 ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          style={styles.flatList}
          data={contacts}
          renderItem={({ item }) => <ContactItem user={item} />}
          keyExtractor={(item) => item._id.toString()}
          ItemSeparatorComponent={() => (
            <Divider style={styles.divider} />
          )}
        />
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: '70%',
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 20,

    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    color: 'white',
    borderRadius: 10,
  },
  flatList: {
    padding: 10,
    height: '100%',
    marginBottom: 20,
  },
  divider: {
    height: 5,
    backgroundColor: 'white',
  },
  loading: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default ContactsList;
