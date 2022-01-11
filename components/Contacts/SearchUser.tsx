import React, { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

import { StyleSheet, FlatList } from 'react-native';
import { Surface, Divider } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import ContactItem from './ContactItem';

const SearchUser = () => {
  const [search, setSearch] = useState('');
  const { debouncedValue } = useDebounce(1000, getUsers);

  const onChangeText = (text: string) => {
    setSearch(text);
    if (text.length > 0) debouncedValue(text);
  };

  // No arrow function because hoisting doesn't work with arrow functions
  async function getUsers(value: string) {
    console.log('getUsers');
  }

  const users = [
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
    { id: 3, username: 'user3' },
    { id: 4, username: 'user4' },
    { id: 5, username: 'user5' },
  ];

  return (
    <Surface style={styles.list}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Szukaj użytkownika"
        onChangeText={(text) => onChangeText(text)}
        value={search}
      />
      <FlatList
        style={styles.flatList}
        data={users}
        renderItem={({ item }) => <ContactItem user={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <Divider style={styles.divider} />
        )}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    maxHeight: '70%',
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
  searchbar: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default SearchUser;
