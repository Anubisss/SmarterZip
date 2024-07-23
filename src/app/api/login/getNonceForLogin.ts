import ZIPATO_URLS from '../constants/zipatoUrls';
import zipatoClient from '../zipatoClient';

const getNonceForLogin = async (): Promise<string> => {
  const logout = await zipatoClient.get(ZIPATO_URLS.logout);
  return logout.data.nonce;
};

export default getNonceForLogin;
