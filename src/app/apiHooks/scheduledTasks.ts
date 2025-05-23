'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ScheduledTaskDTO } from '../scheduler/types';
import { SSR_DYNAMIC_DATA_STALE_TIME } from './lib/constants';
import { getScheduledTasks } from './lib/fetchApi';
import { HttpError } from './lib/httpError';

export const useScheduledTasks = () => {
  return useQuery<ScheduledTaskDTO[]>({
    queryKey: ['scheduledTasks'],
    queryFn: getScheduledTasks,
    staleTime: SSR_DYNAMIC_DATA_STALE_TIME,
  });
};

const deleteScheduledTask = async (id: number): Promise<void> => {
  const response = await fetch(`/api/scheduled-tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
};

export const useDeleteScheduledTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteScheduledTask,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['scheduledTasks'] });
    },
  });
};

interface NewScheduledTask {
  roomId: number;
  deviceId: number;
  deviceStateUuid: string;
  when: string;
  action: string;
}

const createScheduledTask = async ({
  roomId,
  deviceId,
  deviceStateUuid,
  when,
  action,
}: NewScheduledTask): Promise<void> => {
  const response = await fetch('/api/scheduled-tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roomId,
      deviceId,
      deviceStateUuid,
      when,
      action,
    }),
  });
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
};

export const useCreateScheduledTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, NewScheduledTask>({
    mutationFn: createScheduledTask,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['scheduledTasks'] });
    },
  });
};
