import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { useStore } from '../../store/provider';
import { getFriends, getProfileInfo } from '../../api/api';

const AuthScreen: React.FC = observer(() => {
  const { user } = useStore(); // Получаем хранилище

  const [steamId, setSteamId] = useState('');
  const [apiKey, setApiKey] = useState('');

  const getFrds = async () => {
    await getFriends(user);
    const friendsIds = user.friends.map(friend => friend.steamid).join(',');
    
    await getProfileInfo(user, friendsIds);
    await getProfileInfo(user, user.steamId); 
  };

  const handleLogin = () => {
    user.setApiKey(apiKey);
    user.setSteamId(steamId);
    getFrds();
    console.log('Login successful', user.isAuth, user.apiKey, user.steamId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Steam ID"
        value={steamId}
        onChangeText={setSteamId}
      />
      <TextInput
        style={styles.input}
        placeholder="API Key"
        secureTextEntry={true}
        value={apiKey}
        onChangeText={setApiKey}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F0F0F0', // Нейтральный фон
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#2C3E50', // Темный цвет текста
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#BDC3C7', // Светлый серый цвет для рамки
    padding: 8,
    borderRadius: 8, // Закругленные углы
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
});

export default AuthScreen;
