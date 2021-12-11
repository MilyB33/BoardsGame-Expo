import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import HomeScreen from '../Screens/HomeScreen';
import SecondScreen from '../Screens/SecondScreen';

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Second"
          component={SecondScreen}
          options={{ title: 'Second Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
