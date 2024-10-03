'use client';

import React, { FC } from 'react';

import { Device as DeviceType } from '../types';
import Lamp from './lamp';

interface Props {
  device: DeviceType;
  isRefreshingDeviceStates: boolean;
  onDeviceStateChange: (deviceId: number, stateValue: string) => void;
}

const Device: FC<Props> = ({ device, isRefreshingDeviceStates, onDeviceStateChange }) => {
  if (device.type === 'lampSwitch') {
    return (
      <Lamp
        device={device}
        isRefreshingDeviceStates={isRefreshingDeviceStates}
        onDeviceStateChange={onDeviceStateChange}
      />
    );
  }

  return <div className="mt-2">{device.name}</div>;
};

export default Device;
