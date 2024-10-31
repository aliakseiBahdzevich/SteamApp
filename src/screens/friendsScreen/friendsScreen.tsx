import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FriendsScreen = () => {
  const [friends, setFriends] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch('https://randomuser.me/api/?results=10');
      const data = await response.json();
      setFriends(data.results);
    };

    fetchFriends();
  }, []);

  const renderItem = ({ item } : {item: Friend}) => (
    <View style={styles.friendItem}>
      <Text style={styles.friendName}>{item.name.last}</Text>
    </View>
  );
  console.log(friends.length)

  return (
    <View style={styles.container}>
      <Text>Friends</Text>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={(item) => item.login.uuid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  friendItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignItems: 'center',
  },
  friendName: {
    fontSize: 18,
    color: 'black',
  },
});

export default FriendsScreen;
