import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const AuthScreen = () => {
  const [steamID, setSteamID] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleLogin = () => {
    // todo: implement login logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="steam ID"
        value={steamID}
        onChangeText={(text) => setSteamID(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="api key"
        secureTextEntry={true}
        value={apiKey}
        onChangeText={(text) => setApiKey(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
});

export default AuthScreen;
