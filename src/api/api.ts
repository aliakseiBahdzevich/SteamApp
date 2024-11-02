import axios from 'axios';
import { useStore } from '../store';
import store from '../store/store';
 
    
    export const getFriends = async (user: User) => {
        try{
            const res = await axios.get('https://api.steampowered.com/ISteamUser/GetFriendList/v0001/', {
                params: {
                    key: user.apiKey,
                    steamid: user.steamId,
                }
            })  
            user.setIsAuth(true);
            const friendsArray: Friend[] = res.data.friendslist.friends.map((friend: Friend) => ({
                steamid: friend.steamid,
                relationship: friend.relationship,
                friend_since: friend.friend_since
            }));            
            user.addFriend(friendsArray);
        }
        catch(error){
            user.setIsAuth(false);
            console.log('errorkdsfnlksdfnlss', error);
            return null;
        }
      }


      export const getProfileInfo = async (user: User, ids: string) => {
        console.log("запрос ебаный рабоатай блять")
        try{
            const res = await axios.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/', {
                params: {
                    key: user.apiKey,
                    steamids: ids,
                }
            })  
            const friendsWithAvatars = res.data.response.players;

            // Обновляем массив друзей, добавляя аватарки через действие
            friendsWithAvatars.forEach((friendWithAvatar: Friend) => {
                user.updateFriendAvatar(friendWithAvatar.steamid, friendWithAvatar.avatar, friendWithAvatar.personastate, friendWithAvatar.personaname);
            });

            console.log(user.friends); 
        }
        catch(error){
            console.log('errorkdsfnlksdfnlss', error);
            return null;    
        }
      }