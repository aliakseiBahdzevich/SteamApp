import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'mobx';
import persist from 'mst-persist';
import { number } from 'mobx-state-tree/dist/internal';


const FriendsModel = types
  .model({
    steamid: types.string,
    relationship: types.string,
    friend_since: types.number,
    avatar: types.maybe(types.string),
    personastate: types.maybe(types.number),
    personaname: types.maybe(types.string)
})

// Модель пользователя
const UserModel = types
  .model({
    steamId: types.string,
    apiKey: types.string,
    isAuth: types.boolean,
    friends: types.array(FriendsModel),
    avatar: types.maybe(types.string),
    personastate: types.maybe(types.number),
    personaname: types.maybe(types.string)
  })
  .actions((self) => ({
    setSteamId(newSteamId: string) {
      self.steamId = newSteamId;
    },
    setApiKey(newApiKey: string) {
      self.apiKey = newApiKey;
    },
    setIsAuth(newIsAuth: boolean) {
      self.isAuth = newIsAuth;
    },
    addFriend(newFriends: Friend[]) {
      // Получаем steamid новых друзей для проверки
      const newFriendIds = newFriends.map(friend => friend.steamid);
      
      // Фильтруем текущих друзей, оставляя только тех, кто есть в новом списке
      self.friends.replace(self.friends.filter(friend => newFriendIds.includes(friend.steamid)));
  
      // Добавляем новых друзей, которых еще нет в списке
      newFriends.forEach(newFriend => {
          const exists = self.friends.find(friend => friend.steamid === newFriend.steamid);
          if (!exists) {
              self.friends.push(newFriend); // Добавляем только если друг не существует
          }
      });
    },
  
  
    clearFriends() {
      self.friends.clear();
    },
    updateFriendAvatar(steamid: string, avatar: string, personastate: number, personaname: string) {
      const friend = self.friends.find(f => f.steamid === steamid) ;
      if (friend) {
        friend.avatar = avatar; // Изменение свойства должно происходить в действии
        friend.personastate = personastate
        friend.personaname = personaname
      }
      else {
        if (self.steamId === steamid) {
          self.avatar = avatar;
          self.personaname = personaname;
          self.personastate = personastate;
      }
    }}

  }));

// Корневое хранилище
const RootStore = types
  .model({
    user: UserModel,
  })
  .create({
  user: {
    steamId: '',
    apiKey: '',
    isAuth: false,
    friends: []
  }
  });

  const store = persist('user1', RootStore, {
    storage: AsyncStorage, // кэшируем
  });

export default RootStore;
