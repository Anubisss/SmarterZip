export interface Room {
  id: number;
  name: string;
  connected: boolean;
}

export interface Device {
  id: number;
  name: string;
  type: string;
  roomId: number;
  stateUuid: string;
}
