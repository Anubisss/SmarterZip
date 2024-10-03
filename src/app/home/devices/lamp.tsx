'use client';

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PiLampPendantFill, PiLampPendantLight } from 'react-icons/pi';

import { Device } from '../types';

interface Props {
  device: Device;
  isRefreshingDeviceStates: boolean;
  onDeviceStateChange: (deviceId: number, stateValue: string) => void;
}

const Lamp: FC<Props> = ({ device, isRefreshingDeviceStates, onDeviceStateChange }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isOn = device.state?.value.value.toLowerCase() === 'true';

  const handleToggleClick = async () => {
    if (isRefreshingDeviceStates || loading || error) {
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
      {(isRefreshingDeviceStates || loading) && (
        <div className="flex items-center justify-center mr-2 p-1">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}
      {!isRefreshingDeviceStates && !loading && error && (
        <div className="text-lg text-red-500 max-w-32 border text-center p-2 mr-2 rounded-lg">
          Can&apos;t change the state. Try reload.
        </div>
      )}
      {!isRefreshingDeviceStates && !loading && !error && (
        <div onClick={handleToggleClick} className="mr-2 p-1 cursor-pointer">
          {isOn ? (
            <PiLampPendantFill className="w-12 h-12" color="#eab308" />
          ) : (
            <PiLampPendantLight className="w-12 h-12" />
          )}
        </div>
      )}
      <div className="cursor-pointer" onClick={handleToggleClick}>
        {device.name}
      </div>
    </div>
  );
};

export default Lamp;
