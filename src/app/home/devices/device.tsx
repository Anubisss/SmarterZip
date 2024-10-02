'use client';

import React, { FC } from 'react';

import { Device as DeviceType } from '../types';
import Lamp from './lamp';

interface Props {
  device: DeviceType;
  onDeviceStateChange: (deviceId: number, stateValue: string) => void;
}

const Device: FC<Props> = ({ device, onDeviceStateChange }) => {
  if (device.type === 'lampSwitch') {
    return <Lamp device={device} onDeviceStateChange={onDeviceStateChange} />;
  }

  return <div className="mt-2">{device.name}</div>;
};

export default Device;
