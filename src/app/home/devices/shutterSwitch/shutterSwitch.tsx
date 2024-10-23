'use client';

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Device } from '../../types';
import BlindsIcon from './blindsIcon';
import useStateRefreshStateUntilStable from './useStateRefreshStateUntilStable';

interface Props {
  device: Device;
  isRefreshingDeviceStates: boolean;
  onDeviceStateChange: (deviceId: number, stateValue: string) => void;
}

const ShutterSwitch: FC<Props> = ({ device, isRefreshingDeviceStates, onDeviceStateChange }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const startStateRefresh = useStateRefreshStateUntilStable(device, (value: string) => {
    onDeviceStateChange(device.id, value);
  });

  const handleIconClick = async (value: string) => {
    if (isRefreshingDeviceStates || loading || error) {
      return;
    }
    setLoading(true);

    const res = await fetch(`/api/devices/states/${device.stateUuid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value,
      }),
    });

    if (!res.ok) {
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      setError(true);
    }

    setLoading(false);
    startStateRefresh();
  };

  const value = device.state?.value.value ?? '50';

  return (
    <div className="mt-2 flex items-center">
      {(isRefreshingDeviceStates || loading) && (
        <div className="flex items-center justify-center mr-4 h-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}
      {!isRefreshingDeviceStates && !loading && error && (
        <div className="text-lg text-red-500 max-w-32 border text-center p-2 mr-2 rounded-lg">
          Can&apos;t change the state. Try reload.
        </div>
      )}
      {!isRefreshingDeviceStates && !loading && !error && (
        <div className="ml-2 mr-4 h-20">
          <BlindsIcon
            value={+value}
            onClickArrowUp={() => handleIconClick('100')}
            onClickHalf={() => handleIconClick('80')}
            onClickArrowDown={() => handleIconClick('0')}
          />
        </div>
      )}
      <div>{device.name}</div>
    </div>
  );
};

export default ShutterSwitch;
