'use client';

import React, { FC } from 'react';

import { Device as DeviceType } from './types';

interface Props {
  device: DeviceType;
}

const Device: FC<Props> = ({ device }) => {
  return <p>{device.name}</p>;
};

export default Device;
