'use client';

import { useQuery } from '@tanstack/react-query';

import { Room } from '../home/types';
import { HttpError } from './lib/httpError';
import { STATIC_DATA_STALE_TIME } from './lib/constants';

const getRooms = async (): Promise<Room[]> => {
  const response = await fetch('/api/rooms');
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
  return await response.json();
};

export const useRooms = () => {
  return useQuery<Room[]>({
    queryKey: ['rooms'],
    queryFn: getRooms,
    refetchOnWindowFocus: false,
    staleTime: STATIC_DATA_STALE_TIME,
  });
};
