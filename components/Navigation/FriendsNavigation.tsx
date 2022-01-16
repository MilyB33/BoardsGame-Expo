import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SearchUserModalScreen from "../Screens/SearchUserModalScreen";
import ContactsScreen from "../Screens/ContactsScreen";

import { FriendsStackParamList } from "../../types/types";

const Stack = createStackNavigator<FriendsStackParamList>();

const FriendsNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="ContactsHome"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="ContactsHome" component={ContactsScreen} />
      <Stack.Screen
        name="SearchUser"
        component={SearchUserModalScreen}
        options={{
          presentation: "transparentModal",
        }}
      />
    </Stack.Navigator>
  );
};

export default FriendsNavigation;
