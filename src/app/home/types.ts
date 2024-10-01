export interface Room {
  id: number;
  name: string;
  connected: boolean;
}

export interface Device {
  id: number;
  name: string;
  type: 'lampSwitch' | 'shutterSwitch';
  roomId: number;
  stateUuid: string;
  state?: DeviceState;
}

export interface DeviceState {
  uuid: string;
  value: {
    value: string;
    timestamp: string;
  };
}
