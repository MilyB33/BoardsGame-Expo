import React, { useState, useContext } from "react";
import useDebounce from "../../hooks/useDebounce";
import ServerClient from "../../clients/serverClient";
import { AuthContext } from "../../context/authContext";

import { StyleSheet, FlatList } from "react-native";
import { Surface, Divider } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import ContactItem from "../Contacts/ContactItem";

import { UserEntry } from "../../types/types";

const SearchUserModal = () => {
  const { authState } = useContext(AuthContext);
  const [results, setResults] = useState<UserEntry[]>([]);
  const [search, setSearch] = useState("");
  const { debouncedValue } = useDebounce(300, getUsers);

  const onChangeText = (text: string) => {
    setSearch(text);
    if (text.length > 0) debouncedValue(text);
  };

  // No arrow function because hoisting doesn't work with arrow functions
  async function getUsers(value: string) {
    if (value.length === 0) {
      setResults([]);
      return;
    }

    const result = await ServerClient.getUsers({ username: value });

    if (!result.success) return;

    const users = result.result.filter((res: any) => res._id !== authState._id);

    setResults(users);
  }

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
        data={results}
        renderItem={({ item }) => <ContactItem user={item} />}
        keyExtractor={(item) => item._id.toString()}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        extraData={[...results]}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    maxHeight: "70%",
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,

    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    color: "white",
    borderRadius: 10,
  },
  flatList: {
    padding: 10,
    height: "100%",
    marginBottom: 20,
  },
  divider: {
    height: 5,
    backgroundColor: "white",
  },
  searchbar: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default SearchUserModal;
