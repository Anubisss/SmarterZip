'use client';

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { PiSquareHalfBottomFill } from 'react-icons/pi';

import { Device } from '../types';

const BlindsIcon: React.FC<{
  value: number;
  onClickArrowUp: () => void;
  onClickHalf: () => void;
  onClickArrowDown: () => void;
}> = ({ value, onClickArrowUp, onClickHalf, onClickArrowDown }) => {
  const height = 100 - value;
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <FaArrowUp
          className="cursor-pointer text-2xl text-black hover:text-gray-500 mb-1"
          onClick={onClickArrowUp}
        />
        <PiSquareHalfBottomFill
          className="cursor-pointer text-2xl text-black hover:text-gray-500 rotate-180"
          onClick={onClickHalf}
        />
        <FaArrowDown
          className="cursor-pointer text-2xl text-black hover:text-gray-500 mt-1"
          onClick={onClickArrowDown}
        />
      </div>
      <div>
        <div className="relative w-10 h-14 bg-gray-100 border-2 border-black">
          <div
            className="absolute top-0 left-0 w-full bg-black"
            style={{ height: `${height}%` }}
          ></div>
        </div>
        <div className="text-center text-sm">{height}%</div>
      </div>
    </div>
  );
};

interface Props {
  device: Device;
  isRefreshingDeviceStates: boolean;
}

const ShutterSwitch: FC<Props> = ({ device, isRefreshingDeviceStates }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
