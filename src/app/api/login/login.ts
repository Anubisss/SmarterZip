import ZIPATO_URLS from '../constants/zipatoUrls';
import zipatoClient from '../zipatoClient';

const login = async (username: string, token: string) => {
  const loginUrl = `${ZIPATO_URLS.login}?username=${username}&token=${token}`;
  const res = await zipatoClient.get(loginUrl);
  return res.data;
};

export default login;
