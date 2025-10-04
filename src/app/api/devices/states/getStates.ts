import { State } from '@/lib/types';
import { HttpError } from '../../../apiHooks/lib/httpError';
import ZIPATO_URLS from '../../constants/zipatoUrls';
import ZipatoClient from '../../lib/zipatoClient';

const getStates = async (): Promise<State[]> => {
  const res = await ZipatoClient.getInstance().getClient().get(ZIPATO_URLS.getAttributeValues);
  if (res.headers['content-type'] !== 'application/json') {
    throw new HttpError(401, 'Invalid content type: probably not logged in');
  }

  const states: State[] = res.data.map((s: State) => ({
    uuid: s.uuid,
    value: {
      value: s.value.value,
      timestamp: s.value.timestamp,
    },
  }));

  return states;
};

export default getStates;
