import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import FriendsScreen from '../screens/friendsScreen/friendsScreen';
import ProfileScreen from '../screens/profileScreen/profileScreen';

export type TabParamList = {
  Friends: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export type TabNavigationProps = {
  navigation: StackNavigationProp<TabParamList>;
};

export default TabNavigation;
