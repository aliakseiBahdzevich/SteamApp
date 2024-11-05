import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './tabNavigation';
import AuthScreen from '../screens/authScreen/authScreen';
import FriendsScreen from '../screens/friendsScreen/friendsScreen';
import ProfileScreen from '../screens/profileScreen/profileScreen';
import {useStore} from '../store/provider';
import {observer} from 'mobx-react';
import {getFriends, getProfileInfo} from '../api/api';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = observer(() => {
  const {friends, user} = useStore();
  useEffect(() => {
      if (user.user?.apiKey && user.user?.steamId) {
        friends.setUserParams(
          user.user?.steamId, 
          user.user?.apiKey, 
        );
        user.fetchProfileInfo();
        if(user.isAuth){
          friends.fetchFriends();
        }
      }
  }, [user.user?.apiKey, user.user?.steamId, user.isAuth]);

  return (
    <NavigationContainer>
      {user.isAuth ? (
        <TabNavigation />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={AuthScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
});

export default RootNavigation;
