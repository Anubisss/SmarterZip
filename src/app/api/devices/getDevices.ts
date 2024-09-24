import ZIPATO_URLS from '../constants/zipatoUrls';
import ZipatoClient from '../lib/zipatoClient';
import roomsConfig from '../config/rooms.json';

interface Device {
  id: number;
  name: string;
  type: string;
  roomId: number;
  stateUuid: string;
}

interface AbilityZipato {
  id: number;
  name: string;
  description: string;
  fields: {
    room: number;
    state?: string;
    position?: string;
  } & ({ state: string; position?: undefined } | { position: string; state?: undefined });
}

const convertDeviceType = (type: string): string => {
  switch (type) {
    case 'MCOHome switch':
    case 'MCOHome MultiSwitch':
      return 'lampSwitch';
    case 'Shutter Switch':
      return 'shutterSwitch';
    default:
      return 'unhandled';
  }
};

const getDevices = async (): Promise<Device[]> => {
  const res = await ZipatoClient.getInstance().getClient().get(ZIPATO_URLS.getAbilities);

  const devices: Device[] = [];
  for (const room of roomsConfig) {
    const devicesInTheRoom: AbilityZipato[] = res.data.filter(
      (device: AbilityZipato) =>
        device.fields.room === room.id && convertDeviceType(device.description)
    );

    for (const deviceInTheRoom of devicesInTheRoom) {
      devices.push({
        id: deviceInTheRoom.id,
        name: deviceInTheRoom.name,
        type: convertDeviceType(deviceInTheRoom.description),
        roomId: deviceInTheRoom.fields.room,
        stateUuid: deviceInTheRoom.fields.state ?? deviceInTheRoom.fields.position,
      });
    }
  }

  return devices;
};

export default getDevices;
