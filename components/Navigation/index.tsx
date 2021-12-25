import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/types';

const Stack = createStackNavigator<RootStackParamList>();

import HomeScreen from '../Screens/HomeScreen';
import EventsScreen from '../Screens/EventsScreen';
import UserEventsScreen from '../Screens/UserEventsScreen';
import UserModal from '../Screens/UserModal';
import AddEventScreen from '../Screens/AddEventSreen';
import EditEventScreen from '../Screens/EditEventScreen';

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
          <Stack.Screen name="UserModal" component={UserModal} />
          <Stack.Screen name="AddEvent" component={AddEventScreen} />
          <Stack.Screen
            name="EditEvent"
            component={EditEventScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
