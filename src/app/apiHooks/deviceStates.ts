'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { DeviceState } from '../home/types';
import { HttpError } from './lib/httpError';
import { REFRESH_ALL_DEVICE_STATES_INTERVAL } from './lib/constants';

const getDeviceStates = async (): Promise<DeviceState[]> => {
  const response = await fetch('/api/devices/states');
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
  return await response.json();
};

export const useDeviceStates = ({
  enabled = true,
  refreshEnabled = false,
  refetchOnWindowFocus = true,
}: { enabled?: boolean; refreshEnabled?: boolean; refetchOnWindowFocus?: boolean } = {}) => {
  return useQuery<DeviceState[]>({
    queryKey: ['deviceStates'],
    queryFn: getDeviceStates,
    enabled,
    refetchInterval: refreshEnabled ? REFRESH_ALL_DEVICE_STATES_INTERVAL : false,
    refetchOnWindowFocus,
  });
};

const getDeviceState = async (stateUuid: string): Promise<{ value: string; timestamp: number }> => {
  const response = await fetch(`/api/devices/states/${stateUuid}`);
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
  const data: DeviceState = await response.json();
  return { value: data.value.value, timestamp: Date.now() };
};

export const useDeviceState = (stateUuid: string, refetchInterval: number | false) => {
  const queryClient = useQueryClient();

  const result = useQuery<{ value: string; timestamp: number }>({
    queryKey: ['deviceState', stateUuid],
    queryFn: () => getDeviceState(stateUuid),
    enabled: refetchInterval === false ? false : true,
    refetchInterval,
  });

  useEffect(() => {
    if (result.data) {
      queryClient.setQueryData<DeviceState[]>(['deviceStates'], (deviceStates) => {
        if (!deviceStates) {
          return undefined;
        }
        return deviceStates.map((ds) =>
          ds.uuid === stateUuid
            ? {
                ...ds,
                value: {
                  ...ds.value,
                  value: result.data.value,
                },
              }
            : ds
        );
      });
    }
  }, [queryClient, result.data, stateUuid]);

  return result;
};

interface ChangeDeviceStateParams {
  deviceStateUuid: string;
  newState: string;
}

const changeDeviceState = async ({
  deviceStateUuid,
  newState,
}: ChangeDeviceStateParams): Promise<void> => {
  const response = await fetch(`/api/devices/states/${deviceStateUuid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      value: newState,
    }),
  });
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
};

export const useChangeDeviceState = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ChangeDeviceStateParams>({
    mutationFn: changeDeviceState,
    onSuccess: (data, params) => {
      queryClient.setQueryData<DeviceState[]>(['deviceStates'], (deviceStates) => {
        if (!deviceStates) {
          return undefined;
        }
        return deviceStates.map((ds) => {
          if (ds.uuid === params.deviceStateUuid) {
            return {
              ...ds,
              value: {
                ...ds.value,
                value: params.newState,
              },
            };
          }
          return ds;
        });
      });
    },
  });
};
