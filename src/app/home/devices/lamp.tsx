'use client';

import React, { FC } from 'react';

import { Device } from '../types';

interface Props {
  device: Device;
}

const Lamp: FC<Props> = ({ device }) => {
  const toggleLamp = () => {};

  const isOn = device.state?.value.value.toLowerCase() === 'true';

  return (
    <div className="mt-2 flex items-center">
      <div
        onClick={toggleLamp}
        className={`mr-2 cursor-pointer w-10 h-10 rounded-full transition ${
          isOn ? 'bg-yellow-500 shadow-lg' : 'bg-gray-700'
        }`}
      ></div>
      <div className="cursor-pointer" onClick={toggleLamp}>
        {device.name}
      </div>
    </div>
  );
};

export default Lamp;
