import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import HomeScreen from '../Screens/HomeScreen';
import SecondScreen from '../Screens/SecondScreen';
import ModalScreen from '../Screens/ModalScreen';

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
          <Stack.Screen
            name="Second"
            component={SecondScreen}
            options={{ title: 'Second Screen' }}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{ presentation: 'transparentModal' }}
        >
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
