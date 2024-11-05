import axios from 'axios';

export const getFriends = async ({apiKey, steamId }: { apiKey: string; steamId: string;}) => {
  try {
    const res = await axios.get('https://api.steampowered.com/ISteamUser/GetFriendList/v0001/', {
        params: {
          key: apiKey,
          steamid: steamId,
        },
      },
    );
    return res.data.friendslist.friends;
  } catch (error) {
    return error;
  }
};

export const getProfileInfo = async ({apiKey, ids}: { apiKey: string; ids: string;}) => {
  try {
    const res = await axios.get(
      'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/',
      {
        params: {
          key: apiKey,
          steamids: ids,
        },
      },
    );
    return res.data.response.players;
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    return { error: errorMessage };
  }
};