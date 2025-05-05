import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import IntroScreen from '../screens/IntroScreen';
import CallScreen from '../screens/CallScreen';
import HomeTabs from './HomeTabs';
const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
   <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Call" component={CallScreen} />
      <Stack.Screen name="Home" component={HomeTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;