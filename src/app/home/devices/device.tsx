'use client';

import React, { FC } from 'react';

import { Device as DeviceType } from '../types';
import Lamp from './lamp';

interface Props {
  device: DeviceType;
}

const Device: FC<Props> = ({ device }) => {
  if (device.type === 'lampSwitch') {
    return <Lamp device={device} />;
  }

  return <div className="mt-2">{device.name}</div>;
};

export default Device;
