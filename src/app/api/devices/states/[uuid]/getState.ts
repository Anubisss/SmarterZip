import ZIPATO_URLS from '@/app/api/constants/zipatoUrls';
import ZipatoClient from '@/app/api/lib/zipatoClient';
import { State } from '@/lib/types';

const getState = async (uuid: string): Promise<State> => {
  return (await ZipatoClient.getInstance().getClient().get(ZIPATO_URLS.getAttributeValue(uuid)))
    .data;
};

export default getState;
