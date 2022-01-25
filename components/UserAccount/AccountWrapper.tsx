import React from "react";

import Options from "./Options";
import UserInfo from "./UserInfo";
import { StyleSheet, View } from "react-native";

const AccountWrapper = () => {
  return (
    <View style={styles.container}>
      <Options />
      <UserInfo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AccountWrapper;
