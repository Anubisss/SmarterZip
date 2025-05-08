interface State {
  uuid: string;
  value: {
    value: string;
    timestamp: string;
  };
}

interface ScheduledTask {
  id: number;
  roomId: number;
  deviceId: number;
  deviceStateUuid: string;
  action: string;
  when: string;
  createdAt: string;
  lastExecutedAt: string;
}

export type { ScheduledTask, State };
