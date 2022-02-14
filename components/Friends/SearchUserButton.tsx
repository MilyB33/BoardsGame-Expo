import React from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet } from "react-native";
import { Surface, IconButton } from "react-native-paper";
import OptionItem from "../Generic/OptionItem";

import { FriendsNavigationProps } from "../../types/types";

interface PropTypes {
  small?: boolean;
}

const SearchUserButton = ({ small }: PropTypes) => {
  const navigation = useNavigation<FriendsNavigationProps>();

  const handlePress = () => navigation.navigate("SearchUser");

  return (
    <>
      <Surface style={styles.container}>
        {small ? (
          <IconButton
            icon="account-search"
            style={styles.button}
            color="white"
            onPress={handlePress}
            size={30}
          />
        ) : (
          <OptionItem
            title="Wyszukiwanie"
            icon="account-search"
            buttonColor="#279927"
            onPress={handlePress}
          />
        )}
      </Surface>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "transparent",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#279927",
    marginBottom: 30,
  },
});

export default SearchUserButton;
