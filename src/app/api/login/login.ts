import ZIPATO_URLS from '../constants/zipatoUrls';
import zipatoClient from '../zipatoClient';

const login = async (username: string, token: string) => {
  const url = `${ZIPATO_URLS.login}?username=${username}&token=${token}`;
  const res = await zipatoClient.get(url);
  return res.data;
};

export default login;
