import ZIPATO_URLS from '../constants/zipatoUrls';
import ZipatoClient from '../lib/zipatoClient';

const login = async (username: string, token: string) => {
  const url = `${ZIPATO_URLS.login}?username=${username}&token=${token}`;
  const res = await ZipatoClient.getInstance().getClient().get(url);
  return res.data;
};

export default login;
