import ZIPATO_URLS from '../constants/zipatoUrls';
import zipatoClient from '../zipatoClient';

interface System {
  name: string;
  uuid: string;
  owner: string;
}

const getSystems = async (): Promise<System[]> => {
  const res = await zipatoClient.get(ZIPATO_URLS.getSystems);

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
