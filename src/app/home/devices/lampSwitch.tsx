'use client';

import React, { FC } from 'react';
import { PiLampPendantFill, PiLampPendantLight } from 'react-icons/pi';

import { useChangeDeviceState } from '@/app/apiHooks/deviceStates';
import { Device } from '../types';

interface Props {
  device: Device;
  isRefreshingDeviceStates: boolean;
}

const LampSwitch: FC<Props> = ({ device, isRefreshingDeviceStates }) => {
  const {
    mutate: changeDeviceState,
    isPending: isChangingDeviceState,
    error,
  } = useChangeDeviceState();

  const isOn = device.state?.value.value.toLowerCase() === 'true';

  const handleToggleClick = () => {
    if (isRefreshingDeviceStates || isChangingDeviceState || error) {
      return;
    }

    const newState = (!isOn).toString();

    changeDeviceState({ deviceStateUuid: device.stateUuid, newState });
  };

  return (
    <div className="mt-2 flex items-center">
      {(isRefreshingDeviceStates || isChangingDeviceState) && (
        <div className="mr-2 flex items-center justify-center p-1">
          <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-blue-500"></div>
        </div>
      )}
      {!isRefreshingDeviceStates && !isChangingDeviceState && error && (
        <div className="mr-2 max-w-32 rounded-lg border p-2 text-center text-lg text-red-500">
          Can&apos;t change the state. Try reload.
        </div>
      )}
      {!isRefreshingDeviceStates && !isChangingDeviceState && !error && (
        <div onClick={handleToggleClick} className="mr-2 cursor-pointer p-1">
          {isOn ? (
            <PiLampPendantFill className="h-12 w-12" color="#eab308" />
          ) : (
            <PiLampPendantLight className="h-12 w-12" />
          )}
        </div>
      )}
      <div className="cursor-pointer" onClick={handleToggleClick}>
        {device.name}
      </div>
    </div>
  );
};

export default LampSwitch;
