'use client';

import { useQuery } from '@tanstack/react-query';

import { Device } from '../home/types';
import { STATIC_DATA_STALE_TIME } from './lib/constants';
import { getDevices } from './lib/fetchApi';

export const useDevices = () => {
  return useQuery<Device[]>({
    queryKey: ['devices'],
    queryFn: getDevices,
    refetchOnWindowFocus: false,
    staleTime: STATIC_DATA_STALE_TIME,
  });
};
