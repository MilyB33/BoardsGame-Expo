import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import useOptions from "../../hooks/useOptions";

import { StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import FriendsTabNavigation from "../Navigation/FriendsTabNavigation";
import Friends from "./Friends";
import ContactItem from "./ContactItem";
import Empty from "./Empty";

const initialState = {
  FriendsList: true,
  FriendsRequests: false,
};

const ContactsList = () => {
  const { options, toggleOption } = useOptions(initialState);

  const {
    userState: {
      friends,
      friendsRequests: { received },
    },
  } = useContext(UserContext);

  const renderComponent = () => {
    console.log(options);
    if (options.FriendsList) {
      return (
        <Friends
          items={friends}
          ItemComponent={ContactItem}
          ComponentIfEmpty={Empty}
        />
      );
    }
    if (options.FriendsRequests) {
      return (
        <Friends
          items={received}
          ItemComponent={ContactItem}
          itemProps={{ isRequest: true }}
        />
      );
    }
  };

  return (
    <Surface style={styles.list}>
      <FriendsTabNavigation toggleOption={toggleOption} />
      {renderComponent()}
    </Surface>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    height: "70%",
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
});

export default ContactsList;
