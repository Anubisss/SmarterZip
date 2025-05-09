import { Device, Room } from '../home/types';
import { ScheduledTask } from './types';

const getDeviceTypeName = (type: Device['type']): string => {
  switch (type) {
    case 'lampSwitch':
      return 'Lamp';
    case 'shutterSwitch':
      return 'Shutter';
    default:
      return 'UNKNOWN';
  }
};

const getUtcTimeFromLocalTime = (date: Date): string => {
  return `${date.getUTCHours().toString().padStart(2, '0')}:${date
    .getUTCMinutes()
    .toString()
    .padStart(2, '0')}`;
};

const getRoomName = (rooms: Room[], roomId: number): string => {
  const room = rooms.find((r) => r.id === roomId);
  return room?.name ?? `UNKNOWN (#${roomId})`;
};

const getDeviceName = (devices: Device[], deviceId: number): string => {
  const device = devices.find((d) => d.id === deviceId);
  if (device) {
    return `[${getDeviceTypeName(device.type)}] ${device.name}`;
  }
  return `UNKNOWN (#${deviceId})`;
};

const sortTasks = (tasks: ScheduledTask[]): void => {
  tasks.sort(
    (a, b) => a.roomId - b.roomId || a.deviceId - b.deviceId || a.when.localeCompare(b.when),
  );
};

export { getDeviceName, getDeviceTypeName, getRoomName, getUtcTimeFromLocalTime, sortTasks };
