'use client';

import { useEffect, useState } from 'react';

import { Device, DeviceState } from '../../types';

const REFRESH_TICKS = 3;
const REFRESH_INTERVAL = 3500;

const getStateValue = async (stateUuid: string): Promise<string> => {
  const res = await fetch(`/api/devices/states/${stateUuid}`);
  if (res.ok) {
    const state: DeviceState = await res.json();
    return state.value.value;
  }
  return '';
};

const useStateRefreshStateUntilStable = (
  device: Device,
  onDeviceStateChange: (value: string) => void
) => {
  const [previousStates, setPreviousStates] = useState<string[]>([]);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    if (
      intervalId &&
      previousStates.length === REFRESH_TICKS &&
      new Set(previousStates).size === 1
    ) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
        setPreviousStates([]);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [previousStates, intervalId]);

  const startRefresh = () => {
    setPreviousStates([]);
    if (!intervalId) {
      const id = setInterval(async () => {
        const currentValue = await getStateValue(device.stateUuid);
        if (currentValue) {
          onDeviceStateChange(currentValue);

          setPreviousStates((prev) => {
            const updated = [...prev, currentValue];
            if (updated.length > REFRESH_TICKS) {
              updated.shift();
            }
            return updated;
          });
        }
      }, REFRESH_INTERVAL);
      setIntervalId(+id);
    }
  };

  return startRefresh;
};

export default useStateRefreshStateUntilStable;
