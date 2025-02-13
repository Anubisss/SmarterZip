'use client';

import { useQuery } from '@tanstack/react-query';

import { Device } from '../home/types';
import { HttpError } from './lib/httpError';
import { STATIC_DATA_STALE_TIME } from './lib/constants';

const getDevices = async (): Promise<Device[]> => {
  const response = await fetch('/api/devices');
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
  return await response.json();
};

export const useDevices = () => {
  return useQuery<Device[]>({
    queryKey: ['devices'],
    queryFn: getDevices,
    refetchOnWindowFocus: false,
    staleTime: STATIC_DATA_STALE_TIME,
  });
};
