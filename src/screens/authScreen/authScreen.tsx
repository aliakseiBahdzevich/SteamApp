import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import {useStore} from '../../store/provider';
import {getFriends, getProfileInfo} from '../../api/api';
import Modal from "react-native-modal";
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import { TextInput, Provider as PaperProvider } from 'react-native-paper';


const AuthScreen: React.FC = observer(() => {
  const {user, friends} = useStore(); // Получаем хранилище

  const [steamId, setSteamId] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleLogin = async () => {
    user.setApiKey(apiKey);
    user.setSteamId(steamId);
  };

  const closeModal = () => {
    user.clearUser();
  }

  return (
    <PaperProvider>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Steam ID"
        value={steamId}
        onChangeText={setSteamId}
        mode='outlined'
      />
      <TextInput
        style={styles.input}
        label="API Key"
        secureTextEntry={true}
        value={apiKey}
        onChangeText={setApiKey}
        mode='outlined'

      />
      <TouchableOpacity style={styles.opacityStyle} disabled={!apiKey || !steamId}  onPress={handleLogin}>
        <Text style={[styles.loadingStyle, {color: 'white'}]}>Login</Text>
      </TouchableOpacity>
      <Modal isVisible={!!user.error} onBackdropPress={closeModal}>
        <View style={styles.loadingView}>
          <Text style={styles.loadingStyle}>{user.error}</Text>
        </View>
      </Modal>
    </View>
    </PaperProvider>
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
  },
  loadingStyle: {
    fontSize: 25,
    color: '#2C3E50',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loadingView: {
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#F0F0F0',
    padding: 16,
    borderRadius: 8,
  },
  opacityStyle: {
    backgroundColor: '#6200EE', 
    padding: 16, 
    borderRadius: 8
  }
});

export default AuthScreen;
