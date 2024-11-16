export interface ScheduledTaskDTO {
  id: number;
  roomId: number;
  deviceId: number;
  deviceStateUuid: string;
  action: string;
  when: string;
  createdAt: string;
  lastExecutedAt: string;
}

export interface ScheduledTask extends ScheduledTaskDTO {
  roomName: string;
  deviceName: string;
}
