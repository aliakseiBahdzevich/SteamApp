import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import FriendsScreen from '../screens/friendsScreen/friendsScreen';
import ProfileScreen from '../screens/profileScreen/profileScreen';
// import {SvgUri} from 'react-native-svg';
// import Profile from '../assets/Icon.svg';

export type TabParamList = {
  Friends: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{
      // headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 80,
        paddingTop: 5,
      }
    }}>
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export type TabNavigationProps = {
  navigation: StackNavigationProp<TabParamList>;
};

export default TabNavigation;
