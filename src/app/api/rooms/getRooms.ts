import ZIPATO_URLS from '../constants/zipatoUrls';
import ZipatoClient from '../lib/zipatoClient';
import roomsConfig from '../config/rooms.json';

interface Room {
  id: number;
  name: string;
  connected: boolean;
}

type RoomZipato = Omit<Room, 'connected'>;

const getRooms = async (): Promise<Room[]> => {
  const res = await ZipatoClient.getInstance().getClient().get(ZIPATO_URLS.getRooms);

  const rooms = [];
  for (const roomConfig of roomsConfig) {
    rooms.push({
      id: roomConfig.id,
      name: roomConfig.name,
      connected: res.data.some((r: RoomZipato) => r.id === roomConfig.id),
    });
  }

  return rooms;
};

export default getRooms;
