'use client';

import React, { FC } from 'react';

import { Room as RoomType, Device as DeviceType } from './types';
import Device from './devices/device';

interface Props {
  room: RoomType;
  devices: DeviceType[];
}

const Room: FC<Props> = ({ room, devices }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${room.connected ? 'bg-white' : 'bg-gray-300'}`}>
      <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
      <p className="text-xs text-gray-600">#{room.id}</p>
      {!room.connected && (
        <p className="text-sm text-red-500">
          This room is offline or not properly configured. Cannot find in Zipato by ID.
        </p>
      )}
      {room.connected && (
        <div className="mt-2">
          {devices.map((device) => (
            <Device key={device.id} device={device} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Room;
