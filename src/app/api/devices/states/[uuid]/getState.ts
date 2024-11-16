import ZIPATO_URLS from '@/app/api/constants/zipatoUrls';
import { State } from '@/lib/types';
import ZipatoClient from '@/app/api/lib/zipatoClient';

const getState = async (uuid: string): Promise<State> => {
  return (await ZipatoClient.getInstance().getClient().get(ZIPATO_URLS.getAttributeValue(uuid)))
    .data;
};

export default getState;
