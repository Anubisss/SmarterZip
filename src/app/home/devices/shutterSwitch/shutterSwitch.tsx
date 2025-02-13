'use client';

import React, { FC } from 'react';

import { Device } from '../../types';
import BlindsIcon from './blindsIcon';
import useStateRefreshStateUntilStable from './useStateRefreshStateUntilStable';
import { useChangeDeviceState } from '@/app/apiHooks/deviceStates';
interface Props {
  device: Device;
  isRefreshingDeviceStates: boolean;
}

const ShutterSwitch: FC<Props> = ({ device, isRefreshingDeviceStates }) => {
  const {
    mutateAsync: changeDeviceState,
    isPending: isChangingDeviceState,
    error,
  } = useChangeDeviceState();

  const { startRefresh } = useStateRefreshStateUntilStable({ device });

  const handleIconClick = async (value: string) => {
    if (isRefreshingDeviceStates || isChangingDeviceState || error) {
      return;
    }
    await changeDeviceState({ deviceStateUuid: device.stateUuid, newState: value });
    startRefresh();
  };

  const value = device.state?.value.value ?? '50';

  return (
    <div className="mt-2 flex items-center">
      {(isRefreshingDeviceStates || isChangingDeviceState) && (
        <div className="flex items-center justify-center mr-4 h-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}
      {!isRefreshingDeviceStates && !isChangingDeviceState && error && (
        <div className="text-lg text-red-500 max-w-32 border text-center p-2 mr-2 rounded-lg">
          Can&apos;t change the state. Try reload.
        </div>
      )}
      {!isRefreshingDeviceStates && !isChangingDeviceState && !error && (
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
