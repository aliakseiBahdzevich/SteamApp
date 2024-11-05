import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {useStore} from '../../store/provider';
import store from '../../store/store';
import axios from 'axios';
import {set, toJS} from 'mobx';
import {getFriends, getProfileInfo} from '../../api/api';
import {Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Dimensions} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import Modal from 'react-native-modal';

const FriendsScreen: React.FC = observer(() => {
  const {user, friends} = useStore();
  const width = Dimensions.get('window').width;
  const [isVisible, setIsVisible] = useState(false);
  const [renderArray, setRenderArray] = useState<Friend[]>([]);
  const [sortBy, setSortBy] = useState<'byOnline' | 'byNewest' | 'byOldest'>();

  const openModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (sortBy === 'byOnline') {
      setRenderArray(
        friends.friends.filter(friend => friend.personastate === 1),
      );
    } else if (sortBy === 'byNewest') {
      setRenderArray(
        friends.friends.slice().sort((a, b) => b.friend_since - a.friend_since),
      );
    } else if (sortBy === 'byOldest') {
      setRenderArray(
        friends.friends.slice().sort((a, b) => a.friend_since - b.friend_since),
      );
    } else {
      setRenderArray(friends.friends);
    }
  }, [friends.friends.length, sortBy]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const renderItem = useCallback(
    ({item}: {item: Friend}) => (
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
        <View
          style={[
            styles.statusView,
            {backgroundColor: item.personastate === 1 ? '#2ECC71' : '#E67E22'},
          ]}></View>
        <Text style={styles.steamIdStyle}>
          дата добавления: {formatDate(item.friend_since)}
        </Text>
      </View>
    ),
    [],
  );

  const onRefresh = async () => {
    friends.fetchFriends();
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.steamIdStyle, {alignSelf: 'center', marginBottom: 15}]}>Friend count: {renderArray.length}</Text>
      <View style={globalStyles.viewRow}>
        <TouchableOpacity
          style={styles.friendsOpacityStyle}
          onPress={openModal}>
          <Text style={[styles.nicknameStyle, {color: 'white'}]}>
            sort friends
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={friends.isLoading}
            onRefresh={onRefresh}
          />
        }
        data={renderArray}
        renderItem={renderItem}
      />
      <Modal isVisible={isVisible} onBackdropPress={closeModal}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={[styles.friendsOpacityStyle, {backgroundColor: 'green'}]}
            onPress={() => {
              setSortBy('byOnline');
              closeModal();
            }}>
            <Text style={[styles.nicknameStyle, {color: 'white'}]}>онлайн</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.friendsOpacityStyle}
            onPress={() => {
              setSortBy('byNewest');
              closeModal();
            }}>
            <Text style={[styles.nicknameStyle, {color: 'white'}]}>
              по убыванию
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.friendsOpacityStyle, {marginBottom: 0}]}
            onPress={() => {
              setSortBy('byOldest');
              closeModal();
            }}>
            <Text style={[styles.nicknameStyle, {color: 'white'}]}>
              по возрастанию
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
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
  loadingView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  statusView: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
  friendsOpacityStyle: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 25,
    color: '#2C3E50',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    padding: 16,
    borderRadius: 8,
  },
});

export default FriendsScreen;
