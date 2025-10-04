import { HttpError } from '../../apiHooks/lib/httpError';
import devicesConfigImport from '../config/devices.json';
import ignoredDevicesConfigImport from '../config/ignoredDevices.json';
import roomsConfigImport from '../config/rooms.json';
import ZIPATO_URLS from '../constants/zipatoUrls';
import ZipatoClient from '../lib/zipatoClient';

const roomsConfig: { id: number; name: string }[] = roomsConfigImport;
const ignoredDevicesConfig: number[] = ignoredDevicesConfigImport;
const devicesConfig: { id: number; name: string }[] = devicesConfigImport;

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

const convertDeviceType = (type: string): string | null => {
  switch (type) {
    case 'MCOHome switch':
    case 'MCOHome MultiSwitch':
      return 'lampSwitch';
    case 'Shutter Switch':
      return 'shutterSwitch';
    default:
      return null;
  }
};

const isDeviceIgnored = (deviceId: number): boolean => {
  return ignoredDevicesConfig.includes(deviceId);
};

const getDeviceName = (device: AbilityZipato): string => {
  const config = devicesConfig.find((dc) => dc.id === device.id);
  if (config) {
    return config.name;
  }
  return device.name;
};

const getDevices = async (): Promise<Device[]> => {
  const res = await ZipatoClient.getInstance().getClient().get(ZIPATO_URLS.getAbilities);
  if (res.headers['content-type'] !== 'application/json') {
    throw new HttpError(401, 'Invalid content type: probably not logged in');
  }

  const devices: Device[] = [];
  for (const room of roomsConfig) {
    const devicesInTheRoom: AbilityZipato[] = res.data.filter(
      (device: AbilityZipato) =>
        device.fields.room === room.id &&
        convertDeviceType(device.description) &&
        !isDeviceIgnored(device.id),
    );

    for (const deviceInTheRoom of devicesInTheRoom) {
      devices.push({
        id: deviceInTheRoom.id,
        name: getDeviceName(deviceInTheRoom),
        type: convertDeviceType(deviceInTheRoom.description) as string,
        roomId: deviceInTheRoom.fields.room,
        stateUuid: deviceInTheRoom.fields.state ?? deviceInTheRoom.fields.position,
      });
    }
  }

  return devices;
};

export default getDevices;
