'use client';

import React, { FC } from 'react';
import { PiLampPendantFill, PiLampPendantLight } from 'react-icons/pi';

import { Device } from '../types';
import { useChangeDeviceState } from '@/app/apiHooks/deviceStates';

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
        <div className="flex items-center justify-center mr-2 p-1">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}
      {!isRefreshingDeviceStates && !isChangingDeviceState && error && (
        <div className="text-lg text-red-500 max-w-32 border text-center p-2 mr-2 rounded-lg">
          Can&apos;t change the state. Try reload.
        </div>
      )}
      {!isRefreshingDeviceStates && !isChangingDeviceState && !error && (
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

export default LampSwitch;
