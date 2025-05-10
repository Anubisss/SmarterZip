'use client';

import React, { FC } from 'react';

import Device from './devices/device';
import { Device as DeviceType, Room as RoomType } from './types';

interface Props {
  room: RoomType;
  devices: DeviceType[];
  isRefreshingDeviceStates: boolean;
}

const Room: FC<Props> = ({ room, devices, isRefreshingDeviceStates }) => {
  return (
    <div
      className={`rounded-lg border border-gray-400 p-4 shadow-md dark:border-gray-600 ${
        room.connected ? 'bg-white dark:bg-gray-800' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-400">{room.name}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-500">#{room.id}</p>
      {!room.connected && (
        <p className="text-sm text-red-500">
          This room is offline or not properly configured. Cannot find in Zipato by ID.
        </p>
      )}
      {room.connected && (
        <div className="mt-2">
          {devices.map((device) => (
            <Device
              key={device.id}
              device={device}
              isRefreshingDeviceStates={isRefreshingDeviceStates}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Room;
