import ZIPATO_URLS from '../constants/zipatoUrls';
import ZipatoClient from '../lib/zipatoClient';

interface System {
  name: string;
  uuid: string;
  owner: string;
}

const getSystems = async (): Promise<System[]> => {
  const res = await ZipatoClient.getInstance().getClient().get(ZIPATO_URLS.getSystems);

  const systems = [];
  for (const system of res.data) {
    systems.push({
      name: system.name,
      uuid: system.uuid,
      owner: system.owner,
    });
  }

  return systems;
};

export default getSystems;
