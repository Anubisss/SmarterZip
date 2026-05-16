import { Device, DeviceState, Room } from '@/app/home/types';
import { ScheduledTaskDTO } from '@/app/scheduler/types';
import { System } from '@/app/systems/types';
import fetchJson from './fetchJson';

const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    return process.env.API_URL ?? 'http://localhost:3000/api';
  }
  return '/api';
};

export const getScheduledTasks = () =>
  fetchJson<ScheduledTaskDTO[]>(`${getBaseUrl()}/scheduled-tasks`);
export const getRooms = () => fetchJson<Room[]>(`${getBaseUrl()}/rooms`);
export const getDevices = () => fetchJson<Device[]>(`${getBaseUrl()}/devices`);
export const getSystems = () => fetchJson<System[]>(`${getBaseUrl()}/systems`);
export const getDeviceStates = () => fetchJson<DeviceState[]>(`${getBaseUrl()}/devices/states`);
export const getDeviceState = (stateUuid: string) =>
  fetchJson<DeviceState>(`${getBaseUrl()}/devices/states/${stateUuid}`);
