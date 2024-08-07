import ZIPATO_URLS from '../../constants/zipatoUrls';
import ZipatoClient from '../../lib/zipatoClient';

const selectSystem = async (systemUuid: string): Promise<boolean> => {
  const url = `${ZIPATO_URLS.selectSystem}?uuid=${systemUuid}`;
  const res = await ZipatoClient.getInstance().getClient().get(url);

  return res.data.uuid === systemUuid;
};

export default selectSystem;
