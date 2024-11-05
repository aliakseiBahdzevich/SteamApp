import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react';
import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { useStore } from '../../store/provider';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { globalStyles } from '../../styles/globalStyles';

const ProfileScreen: React.FC = observer(() => {
  const { user, friends } = useStore();

  const handleLogout = () => {
    user.clearUser();
    friends.clearFriends();
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.nicknameStyle, {marginBottom: 15}]}>{user.user?.personaname}</Text>
        <Text style={[styles.nicknameStyle, {marginBottom: 15,fontSize: 18}]}>steam id: {user.user?.steamId}</Text>
        <FastImage
          style={styles.avatar}
          source={{
            uri: user.user?.avatar,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={[styles.statusView, { backgroundColor: user.user?.personastate === 1 ? '#2ECC71' : '#E67E22' }]}></View>       
        <View style={globalStyles.flex}/>
        <TouchableOpacity style={styles.opacityStyle} onPress={handleLogout}>
          <Text style={[styles.opacityTextStyle, { color: 'white' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 96,
    width: '100%'
  },
  opacityTextStyle: {
    fontSize: 25,
    color: '#2C3E50',
    textAlign: 'center'
  },
  opacityStyle: {
    backgroundColor: '#6200EE',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  avatar: {
    width: 200,
    height: 200,
    marginVertical: 5,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#6200EE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  nicknameStyle: {
    fontSize: 25,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  statusView: {
    width: 30,
    height: 30,
    borderRadius: 15, 
    marginTop: 10
  },
  card: {
    flex: 1, // Позволяет карточке занимать всё доступное пространство
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    justifyContent: 'space-between' // Распределяет элементы по краям
  },
  content: {
    flex: 1, // Позволяет этому контейнеру занимать всё доступное пространство между верхними элементами и кнопкой
    justifyContent: 'center', // Выравнивание содержимого по центру, если нужно
  }
});

export default ProfileScreen;

