'use client';

import React from 'react';

import { Device as DeviceType } from './types';

interface Props {
  device: DeviceType;
}

const Device = ({ device }: Props) => {
  return <p>{device.name}</p>;
};

export default Device;
