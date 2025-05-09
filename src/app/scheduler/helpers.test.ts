import '@testing-library/jest-dom';

import { Device } from '../home/types';
import {
  getDeviceName,
  getDeviceTypeName,
  getRoomName,
  getUtcTimeFromLocalTime,
  sortTasks,
} from './helpers';

describe('helpers', () => {
  describe('getDeviceTypeName', () => {
    it('should return Lamp', () => {
      expect(getDeviceTypeName('lampSwitch')).toBe('Lamp');
    });

    it('should return Shutter', () => {
      expect(getDeviceTypeName('shutterSwitch')).toBe('Shutter');
    });

    it('should return UNKNOWN', () => {
      expect(getDeviceTypeName('fe3t' as Device['type'])).toBe('UNKNOWN');
    });
  });

  describe('getUtcTimeFromLocalTime', () => {
    it('returns correct UTC time for a given Date object', () => {
      const date = new Date(Date.UTC(2000, 0, 1, 10, 15));
      expect(getUtcTimeFromLocalTime(date)).toBe('10:15');
    });

    it('returns correct UTC time when input date is in local time zone', () => {
      const localDate = new Date(2023, 4, 22, 10, 15);

      const expectedUtc = `${localDate.getUTCHours().toString().padStart(2, '0')}:${localDate
        .getUTCMinutes()
        .toString()
        .padStart(2, '0')}`;

      expect(getUtcTimeFromLocalTime(localDate)).toBe(expectedUtc);
    });

    it('pads single digit hours and minutes with leading zero', () => {
      const date = new Date(Date.UTC(2023, 5, 15, 3, 4));
      expect(getUtcTimeFromLocalTime(date)).toBe('03:04');
    });
  });

  describe('getRoomName', () => {
    const rooms = [
      {
        id: 345,
        name: 'Living room',
        connected: false,
      },
      {
        id: 325,
        name: 'Bedroom',
        connected: false,
      },
      {
        id: 575,
        name: 'Kitchen',
        connected: false,
      },
    ];

    it('should find the correct rooms and return its name', () => {
      const roomName = getRoomName(rooms, 325);
      expect(roomName).toBe('Bedroom');
    });

    it('should not find the room and return unknown room', () => {
      const roomName = getRoomName(rooms, 111);
      expect(roomName).toBe('UNKNOWN (#111)');
    });
  });

  describe('getDeviceName', () => {
    const devices: Device[] = [
      {
        id: 345,
        name: 'Kitchen Lamp',
        type: 'lampSwitch',
        roomId: 457,
        stateUuid: 'uuid-1',
      },
      {
        id: 573,
        name: 'Living Room Shutter, Left',
        type: 'shutterSwitch',
        roomId: 417,
        stateUuid: 'uuid-2',
      },
      {
        id: 123,
        name: 'Bedroom Lamp',
        type: 'lampSwitch',
        roomId: 437,
        stateUuid: 'uuid-3',
      },
    ];

    it('should find the correct lamp and return its name and type', () => {
      const deviceName = getDeviceName(devices, 345);
      expect(deviceName).toBe('[Lamp] Kitchen Lamp');
    });

    it('should find the correct shutter and return its name and type', () => {
      const deviceName = getDeviceName(devices, 573);
      expect(deviceName).toBe('[Shutter] Living Room Shutter, Left');
    });

    it('should not find the device and return unknown device', () => {
      const deviceName = getDeviceName(devices, 866);
      expect(deviceName).toBe('UNKNOWN (#866)');
    });
  });

  describe('sortTasks', () => {
    it('sort by roomId', () => {
      const tasks = [
        {
          id: 532,
          roomId: 73,
          deviceId: 12,
          deviceStateUuid: '',
          action: '',
          when: '09:08',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
        {
          id: 537,
          roomId: 77,
          deviceId: 12,
          deviceStateUuid: '',
          action: '',
          when: '09:08',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
        {
          id: 128,
          roomId: 69,
          deviceId: 12,
          deviceStateUuid: '',
          action: '',
          when: '09:08',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
      ];
      sortTasks(tasks);

      expect(tasks.length).toBe(3);
      expect(tasks[0].id).toBe(128);
      expect(tasks[1].id).toBe(532);
      expect(tasks[2].id).toBe(537);
    });

    it('sort by roomId then deviceId', () => {
      const tasks = [
        {
          id: 976,
          roomId: 73,
          deviceId: 1,
          deviceStateUuid: '',
          action: '',
          when: '09:08',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
        {
          id: 532,
          roomId: 73,
          deviceId: 4,
          deviceStateUuid: '',
          action: '',
          when: '09:08',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
        {
          id: 537,
          roomId: 77,
          deviceId: 2,
          deviceStateUuid: '',
          action: '',
          when: '09:08',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
        {
          id: 128,
          roomId: 69,
          deviceId: 12,
          deviceStateUuid: '',
          action: '',
          when: '09:08',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
        {
          id: 129,
          roomId: 69,
          deviceId: 10,
          deviceStateUuid: '',
          action: '',
          when: '09:08',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
      ];
      sortTasks(tasks);

      expect(tasks.length).toBe(5);
      expect(tasks[0].id).toBe(129);
      expect(tasks[1].id).toBe(128);
      expect(tasks[2].id).toBe(976);
      expect(tasks[3].id).toBe(532);
      expect(tasks[4].id).toBe(537);
    });

    it('sort by roomId then deviceId then when', () => {
      const tasks = [
        {
          id: 976,
          roomId: 73,
          deviceId: 1,
          deviceStateUuid: '',
          action: '',
          when: '09:08',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
        {
          id: 532,
          roomId: 73,
          deviceId: 4,
          deviceStateUuid: '',
          action: '',
          when: '09:08',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
        {
          id: 537,
          roomId: 77,
          deviceId: 2,
          deviceStateUuid: '',
          action: '',
          when: '09:08',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
        {
          id: 128,
          roomId: 69,
          deviceId: 12,
          deviceStateUuid: '',
          action: '',
          when: '09:08',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
        {
          id: 131,
          roomId: 69,
          deviceId: 12,
          deviceStateUuid: '',
          action: '',
          when: '09:07',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
        {
          id: 132,
          roomId: 69,
          deviceId: 12,
          deviceStateUuid: '',
          action: '',
          when: '10:12',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
        {
          id: 129,
          roomId: 69,
          deviceId: 10,
          deviceStateUuid: '',
          action: '',
          when: '09:08',
          createdAt: '',
          lastExecutedAt: '',
          roomName: '',
          deviceName: '',
        },
      ];
      sortTasks(tasks);

      expect(tasks.length).toBe(7);
      expect(tasks[0].id).toBe(129);
      expect(tasks[1].id).toBe(131);
      expect(tasks[2].id).toBe(128);
      expect(tasks[3].id).toBe(132);
      expect(tasks[4].id).toBe(976);
      expect(tasks[5].id).toBe(532);
      expect(tasks[6].id).toBe(537);
    });
  });
});
