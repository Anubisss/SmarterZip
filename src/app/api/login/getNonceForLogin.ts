import ZIPATO_URLS from '../constants/zipatoUrls';
import ZipatoClient from '../lib/zipatoClient';

const getNonceForLogin = async (): Promise<string> => {
  const logout = await ZipatoClient.getInstance().getClient().get(ZIPATO_URLS.logout);
  return logout.data.nonce;
};

export default getNonceForLogin;
