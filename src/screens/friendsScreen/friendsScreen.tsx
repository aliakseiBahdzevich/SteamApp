import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { useStore } from '../../store/provider';
import store from '../../store/store';
import axios from 'axios';
import { set } from 'mobx';
import { getFriends, getProfileInfo } from '../../api/api';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { number } from 'mobx-state-tree/dist/internal';
import { getSnapshot } from 'mobx-state-tree';
import { Dimensions } from 'react-native';


const FriendsScreen: React.FC = observer(() => {

  const { user } = useStore();
  const width = Dimensions.get('window').width;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); 
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); 
    return `${day}.${month}.${year}`;
  }

  const sortByDate = user.friends.slice().sort((a, b) => b.friend_since - a.friend_since);
  // const ids = user.friends.map(friend => friend.steamid).join(',')

  
  const renderItem = useCallback(({ item } : { item: Friend }) => (
    <View style={styles.friendItem}>
      <Text style={styles.nicknameStyle}>{item.personaname}</Text>
      <Text style={styles.steamIdStyle}>steam id: {item.steamid}</Text>
      <FastImage
        style={styles.imageStyle} 
        source={{
          uri: item.avatar,
          priority: FastImage.priority.normal, 
        }}
        resizeMode={FastImage.resizeMode.cover} 
      />
      <View style={{width: 15, height: 15, borderRadius: 7.5, backgroundColor: item.personastate === 1 ? '#2ECC71' :'#E67E22'}}></View>
      <Text style={styles.steamIdStyle}>дата добавления: {formatDate(item.friend_since)}</Text>
    </View>

  ), []);

  const onRefresh = async () => {
    await getFriends(user);
    const friendsIds = user.friends.map(friend => friend.steamid).join(',');
    
    await getProfileInfo(user, friendsIds);
    await getProfileInfo(user, user.steamId); 
  }
  return (
    <View style={styles.container}>
      <FlatList
       refreshControl={
        <RefreshControl
          refreshing={false} 
          onRefresh={onRefresh}
        />
      }
        data={sortByDate}
        renderItem={renderItem}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
    // paddingTop: 70,
    flex: 1,
    justifyContent: 'center',
    marginBottom: 60, 
    backgroundColor: '#0F0F0',

  },
  friendItem: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 1,
  },
  nicknameStyle: {
    fontSize: 25,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  steamIdStyle: {
    fontSize: 17,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  imageStyle: {
      width: 80,
      height: 80,
      marginVertical: 5,
      borderRadius: 40,
      borderWidth: 4,
      borderColor: '#4B77BE',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
  }
});

export default FriendsScreen;
