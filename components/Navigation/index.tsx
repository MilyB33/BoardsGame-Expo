import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import HomeScreen from '../Screens/HomeScreen';
import EventsScreen from '../Screens/EventsScreen';
import ModalScreen from '../Screens/ModalScreen';
import UserEventsScreen from '../Screens/UserEventsScreen';
import AddEventScreen from '../Screens/AddEventSreen';

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Events" component={EventsScreen} />
          <Stack.Screen
            name="UserEvents"
            component={UserEventsScreen}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{ presentation: 'transparentModal' }}
        >
          <Stack.Screen name="Modal" component={ModalScreen} />
          <Stack.Screen name="AddEvent" component={AddEventScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
