'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import { System } from '../systems/types';
import { HttpError } from './lib/httpError';
import { STATIC_DATA_STALE_TIME } from './lib/constants';
import { getSystems } from './lib/fetchApi';

export const useSystems = () => {
  return useQuery<System[]>({
    queryKey: ['systems'],
    queryFn: getSystems,
    refetchOnWindowFocus: false,
    staleTime: STATIC_DATA_STALE_TIME,
  });
};

const selectSystem = async (systemUuid: string): Promise<void> => {
  const response = await fetch(`/api/systems/select?uuid=${systemUuid}`);
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
};

export const useSelectSystem = () => {
  return useMutation<void, Error, string>({
    mutationFn: selectSystem,
  });
};
