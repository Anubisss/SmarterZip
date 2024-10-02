'use client';

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Device } from '../types';

interface Props {
  device: Device;
  onDeviceStateChange: (deviceId: number, stateValue: string) => void;
}

const Lamp: FC<Props> = ({ device, onDeviceStateChange }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isOn = device.state?.value.value.toLowerCase() === 'true';

  const handleToggleClick = async () => {
    if (loading || error) {
      return;
    }
    setLoading(true);

    const newState = (!isOn).toString();

    const res = await fetch(`/api/devices/states/${device.stateUuid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: newState,
      }),
    });

    if (res.ok) {
      onDeviceStateChange(device.id, newState);
    } else {
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      setError(true);
    }

    setLoading(false);
  };

  return (
    <div className="mt-2 flex items-center">
      {loading && (
        <div className="flex items-center justify-center mr-2">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      )}
      {!loading && error && (
        <div className="text-lg text-red-500 max-w-32 border text-center p-2 mr-2 rounded-lg">
          Can&apos;t change the state. Try reload.
        </div>
      )}
      {!loading && !error && (
        <div
          onClick={handleToggleClick}
          className={`mr-2 cursor-pointer w-10 h-10 rounded-full transition ${
            isOn ? 'bg-yellow-500 shadow-lg' : 'bg-gray-700'
          }`}
        ></div>
      )}
      <div className="cursor-pointer" onClick={handleToggleClick}>
        {device.name}
      </div>
    </div>
  );
};

export default Lamp;
