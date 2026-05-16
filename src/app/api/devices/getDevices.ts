import ZIPATO_URLS from '../constants/zipatoUrls';
import { getDevicesConfig, getIgnoredDevicesConfig, getRoomsConfig } from '../lib/configReader';
import ZipatoClient from '../lib/zipatoClient';

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

const getDevices = async (): Promise<Device[]> => {
  const roomsConfig = getRoomsConfig();
  const devicesConfig = getDevicesConfig();
  const ignoredDevicesConfig = getIgnoredDevicesConfig();

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

  const res = await ZipatoClient.getInstance().getClient().get(ZIPATO_URLS.getAbilities);

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
