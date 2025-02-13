'use client';

import React, { FC } from 'react';

import { Device as DeviceType } from '../types';
import LampSwitch from './lampSwitch';
import ShutterSwitch from './shutterSwitch/shutterSwitch';

interface Props {
  device: DeviceType;
  isRefreshingDeviceStates: boolean;
}

const Device: FC<Props> = ({ device, isRefreshingDeviceStates }) => {
  if (device.type === 'lampSwitch') {
    return <LampSwitch device={device} isRefreshingDeviceStates={isRefreshingDeviceStates} />;
  }
  if (device.type === 'shutterSwitch') {
    return <ShutterSwitch device={device} isRefreshingDeviceStates={isRefreshingDeviceStates} />;
  }

  return <div className="mt-2">{device.name}</div>;
};

export default Device;
