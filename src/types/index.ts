
interface Friend {
  steamid: string;
  relationship: string;
  friend_since: number;
  avatar?: string;
  personastate?: number;
  personaname?: string;
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
