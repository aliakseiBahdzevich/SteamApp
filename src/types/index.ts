
interface FriendId {
  steamid: string;
  relationship: string;
  friend_since: number;
}

// interface Friend extends FriendId {
//   avatar?: string;
//   personastate?: number;
//   personaname?: string;
// }
interface Friend{
  avatar?: string;
  personastate?: number;
  personaname?: string;
  friend_since: number;
  steamid: string;
}

interface User {
  [x: string]: any;
  steamId: string;
  apiKey: string;
  isAuth: boolean;
  friends: Friend[];
  avatar?: string;
  personastate?: number;
  personaname?: string;
  addFriend: (friends: Friend[]) => void;
} 
