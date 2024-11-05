import {
  applySnapshot,
  flow,
  Instance,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persist from 'mst-persist';
import {getProfileInfo, getFriends} from '../api/api';
import Modal from "react-native-modal";


const FriendModel = types.model({
  steamid: types.string,
  friend_since: types.number,
  avatar: types.maybe(types.string),
  personastate: types.maybe(types.number),
  personaname: types.maybe(types.string),
});
const UserModel = types.model({
  steamId: types.string,
  apiKey: types.string,
  avatar: types.maybe(types.string),
  personastate: types.maybe(types.number),
  personaname: types.maybe(types.string),
});
const UserModelForReq = types.model({
  steamId: types.string,
  apiKey: types.string,
})


const FriendsStateModel = types
  .model({
    friends: types.array(FriendModel),
    error: types.maybe(types.string),
    isLoading: types.boolean,
    user: types.maybe(UserModelForReq),
  })
  .actions(self => ({
    setUserParams(
      newSteamId: string, 
      newApiKey: string, 
    ){
      self.user = {
        steamId: newSteamId,
        apiKey: newApiKey,
      }
    },
    fetchFriends: flow(function* fetchProjects() {
      self.isLoading = true;
      self.error = undefined;

      try {
        if (self.user?.apiKey) {
          const res: FriendId[] = yield getFriends({
            apiKey: self.user?.apiKey,
            steamId: self.user?.steamId,
          });
          const resultInfoFriends = yield getProfileInfo({
            apiKey: self.user?.apiKey,
            ids: res.map((friend: FriendId) => friend.steamid).join(','),
          });
          //const date = res.map((friend: FriendId) => friend.friend_since);
          const resultFullInfoFriends = resultInfoFriends.map((friend: Friend) => {
            const date = res.find((item: FriendId) => item.steamid === friend.steamid)?.friend_since;
            return {
              ...friend,
              friend_since: date,
            };
          })
          self.friends = resultFullInfoFriends;
        }
      } catch (error) {
        const err = error as string;
        self.error = err;
      } finally {
        self.isLoading = false;
      }
    }),
    clearFriends() {
      self.friends.clear();
      self.error = undefined;
      self.isLoading = false;
      self.user = {
        steamId: '',
        apiKey: '',
      };
    },
  }));

//userModalState
const UserStateModel = types
  .model({
    user: types.maybe(UserModel),
    error: types.maybe(types.string),
    isLoading: types.boolean,
    isAuth: types.boolean,
  })
  .actions(self => ({
    setSteamId(newSteamId: string) {
      if (self.user) {
        self.user.steamId = newSteamId;
      }

    },
    setApiKey(newApiKey: string) {
      if (self.user) {
        self.user.apiKey = newApiKey;
      }
    },
    fetchProfileInfo: flow(function* fetchProjects() {
      self.isLoading = true;
      self.error = undefined;
      try {
        if (self.user?.apiKey && self.user.steamId) {
          const res = yield getProfileInfo({
            apiKey: self.user.apiKey,
            ids: self.user.steamId,
          })
          if (res.error) {
            self.isAuth = false;
            self.error = res.error;
          } 
          else{
            applySnapshot(self.user, { ...self.user, ...res[0] });
            self.isAuth = true;
          }
        }
      } catch (error) {
        const err = error as string;
        self.error = err;
      } finally {
        self.isLoading = false;
      }
    }),
    clearUser() {
      self.user = {
        steamId: '',
        apiKey: '',
        avatar: '',
        personastate: 0,
        personaname: '',
      };
      self.isLoading = false;
      self.isAuth = false;
      self.error = undefined;
    },
  }));

// Корневое хранилище
const RootStore = types
  .model({
    user: UserStateModel,
    friends: FriendsStateModel,
  })
  .create({
    user: {
      user: {
        steamId: '',
        apiKey: '',
        avatar: '',
        personastate: 0,
        personaname: '',
      },
      isAuth: false,
      error: undefined,
      isLoading: false,
    },
    friends: {
      friends: [],
      error: undefined,
      isLoading: false,
      user: {
        steamId: '',
        apiKey: '',
      }
    }
  });

const store = persist('storage', RootStore, {
  storage: AsyncStorage, // кэшируем
});

export default RootStore;
