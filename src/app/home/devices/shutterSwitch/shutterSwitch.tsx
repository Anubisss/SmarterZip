'use client';

import React, { FC } from 'react';

import { useChangeDeviceState, useStopDevice } from '@/app/apiHooks/deviceStates';
import { Device } from '../../types';
import BlindsIcon from './blindsIcon';
import useStateRefreshStateUntilStable from './useStateRefreshStateUntilStable';
interface Props {
  device: Device;
  isRefreshingDeviceStates: boolean;
}

const ShutterSwitch: FC<Props> = ({ device, isRefreshingDeviceStates }) => {
  const {
    mutateAsync: changeDeviceState,
    isPending: isChangingDeviceState,
    error: changeError,
  } = useChangeDeviceState();

  const { mutateAsync: stopDevice, isPending: isStopping, error: stopError } = useStopDevice();

  const { startRefresh } = useStateRefreshStateUntilStable({ device });

  const isBusy = isRefreshingDeviceStates || isChangingDeviceState || isStopping;
  const error = changeError || stopError;

  const handleIconClick = async (value: string) => {
    if (isBusy || error) return;
    await changeDeviceState({ deviceStateUuid: device.stateUuid, newState: value });
    startRefresh();
  };

  const handleStop = async () => {
    if (isBusy || error) return;
    await stopDevice(device.stateUuid);
    startRefresh();
  };

  const value = device.state?.value.value ?? '50';

  return (
    <div className="mt-2 flex items-center">
      {isBusy && (
        <div className="mr-4 flex h-20 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-blue-500"></div>
        </div>
      )}
      {!isBusy && error && (
        <div className="mr-2 max-w-32 rounded-lg border p-2 text-center text-lg text-red-500">
          Can&apos;t change the state. Try reload.
        </div>
      )}
      {!isBusy && !error && (
        <div className="ml-2 mr-4 h-20">
          <BlindsIcon
            value={+value}
            onClickArrowUp={() => handleIconClick('100')}
            onClickStop={handleStop}
            onClickArrowDown={() => handleIconClick('0')}
          />
        </div>
      )}
      <div>{device.name}</div>
    </div>
  );
};

export default ShutterSwitch;
