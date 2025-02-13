'use client';

import { useEffect, useState } from 'react';

import { Device } from '../../types';
import { useDeviceState } from '@/app/apiHooks/deviceStates';

const REFRESH_TICKS = 3;
const REFRESH_INTERVAL = 3500;

interface UseStateRefreshStateUntilStableProps {
  device: Device;
}

const useStateRefreshStateUntilStable = ({ device }: UseStateRefreshStateUntilStableProps) => {
  const [previousStates, setPreviousStates] = useState<string[]>([]);
  const [shouldPoll, setShouldPoll] = useState(false);

  const { data: currentState } = useDeviceState(
    device.stateUuid,
    shouldPoll ? REFRESH_INTERVAL : false
  );

  useEffect(() => {
    if (currentState !== undefined) {
      setPreviousStates((prev) => {
        const updated = [...prev, currentState.value];
        if (updated.length > REFRESH_TICKS) {
          updated.shift();
        }
        return updated;
      });
    }
  }, [currentState]);

  useEffect(() => {
    if (previousStates.length === REFRESH_TICKS && new Set(previousStates).size === 1) {
      setShouldPoll(false);
    }
  }, [previousStates]);

  const startRefresh = () => {
    setPreviousStates([]);
    setShouldPoll(true);
  };

  return { startRefresh };
};

export default useStateRefreshStateUntilStable;
