import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react';
import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useStore } from '../../store/provider';
import store from '../../store/store';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

const ProfileScreen: React.FC = observer(() => {

  const { user } = useStore();

  const handleLogout = () => {
    store.user.setApiKey('');
    store.user.setSteamId('');
    store.user.setIsAuth(false);
    store.user.clearFriends()
  }

  // const ids = user.friends.map(friend => friend.steamid)

  // const clearStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //   } catch (error) {
  //     console.error('Error clearing storage:', error);
  //   }
  // };

  return (
    <View style={styles.container}>
        <FastImage
          style={{ width: 200, height: 200, marginVertical: 5, borderRadius: 100 }} 
          source={{
            uri: user.avatar ,
            priority: FastImage.priority.normal, 
          }}
          resizeMode={FastImage.resizeMode.cover} 
        />
      <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: user.personastate === 1 ? '#2ECC71' :'#E67E22'}}></View>
      <Text style={styles.nicknameStyle}>{user.personaname}</Text>
      <Button title="Log out" onPress={handleLogout} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    width: '100%'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  nicknameStyle: {
    fontSize: 30,
    color: 'black',
  },
});

export default ProfileScreen;
