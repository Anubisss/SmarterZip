import { ScheduledTaskDTO } from '@/app/scheduler/types';
import fetchJson from './fetchJson';
import { Device, DeviceState, Room } from '@/app/home/types';
import { System } from '@/app/systems/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getScheduledTasks = () => fetchJson<ScheduledTaskDTO[]>(`${BASE_URL}/scheduled-tasks`);
export const getRooms = () => fetchJson<Room[]>(`${BASE_URL}/rooms`);
export const getDevices = () => fetchJson<Device[]>(`${BASE_URL}/devices`);
export const getSystems = () => fetchJson<System[]>(`${BASE_URL}/systems`);
export const getDeviceStates = () => fetchJson<DeviceState[]>(`${BASE_URL}/devices/states`);
export const getDeviceState = (stateUuid: string) =>
  fetchJson<DeviceState>(`${BASE_URL}/devices/states/${stateUuid}`);
