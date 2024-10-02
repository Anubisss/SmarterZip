import ZIPATO_URLS from '@/app/api/constants/zipatoUrls';
import ZipatoClient from '@/app/api/lib/zipatoClient';

const changeState = async (uuid: string, value: string): Promise<void> => {
  await ZipatoClient.getInstance().getClient().put(ZIPATO_URLS.changeAttributeValue(uuid), {
    value,
  });
};

export default changeState;
