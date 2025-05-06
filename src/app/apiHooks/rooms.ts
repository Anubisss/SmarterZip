'use client';

import { useQuery } from '@tanstack/react-query';

import { Room } from '../home/types';
import { STATIC_DATA_STALE_TIME } from './lib/constants';
import { getRooms } from './lib/fetchApi';

export const useRooms = () => {
  return useQuery<Room[]>({
    queryKey: ['rooms'],
    queryFn: getRooms,
    refetchOnWindowFocus: false,
    staleTime: STATIC_DATA_STALE_TIME,
  });
};
