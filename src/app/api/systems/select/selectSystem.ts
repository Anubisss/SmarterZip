import ZIPATO_URLS from '../../constants/zipatoUrls';
import zipatoClient from '../../zipatoClient';

const selectSystem = async (systemUuid: string): Promise<boolean> => {
  const url = `${ZIPATO_URLS.selectSystem}?uuid=${systemUuid}`;
  const res = await zipatoClient.get(url);

  return res.data.uuid === systemUuid;
};

export default selectSystem;
