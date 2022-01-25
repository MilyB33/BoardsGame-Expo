import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../Screens/HomeScreen";
import EventsScreen from "../Screens/EventsScreen";
import UserEventsScreen from "../Screens/UserEventsScreen";
import UserModal from "../Screens/UserModal";
import AddEventScreen from "../Screens/AddEventSreen";
import EditEventScreen from "../Screens/EditEventScreen";
import UserAccountScreen from "../Screens/UserAccountScreen";
import ChangePasswordModalScreen from "../Screens/ChangePasswordModalScreen";

import FriendsNavigation from "./FriendsNavigation";

import { RootStackParamList } from "../../types/types";

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Events" component={EventsScreen} />
          <Stack.Screen name="UserEvents" component={UserEventsScreen} />
          <Stack.Screen name="UserAccount" component={UserAccountScreen} />
          <Stack.Screen name="Contacts" component={FriendsNavigation} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            presentation: "transparentModal",
          }}
        >
          <Stack.Screen name="UserModal" component={UserModal} />
          <Stack.Screen name="AddEvent" component={AddEventScreen} />
          <Stack.Screen name="EditEvent" component={EditEventScreen} />
          <Stack.Screen
            name="ChangePasswordModal"
            component={ChangePasswordModalScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
