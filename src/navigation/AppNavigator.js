// src/navigation/AppNavigator.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpSreen';
import ForgotPassword from '../screens/ForgotPassword';
import ProfileScreen from '../screens/ProfileScreen'; 


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        
        <Stack.Screen name="SignUp" component={SignUpScreen}  options={{ headerShown: false }} /> 
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}n />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
