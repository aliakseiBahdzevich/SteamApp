import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './tabNavigation';
import AuthScreen from '../screens/authScreen/authScreen';
import FriendsScreen from '../screens/friendsScreen/friendsScreen';
import ProfileScreen from '../screens/profileScreen/profileScreen';

// import LoginScreen from '../screens/LoginScreen';
// import HomeScreen from '../screens/HomeScreen';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const isSignedIn = false;

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <TabNavigation />
      ) : (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={AuthScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;
