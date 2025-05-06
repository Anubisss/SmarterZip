import React, { FC } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import Scheduler from './scheduler';
import { getDevices, getRooms, getScheduledTasks } from '../apiHooks/lib/fetchApi';

const SchedulerPage: FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['scheduledTasks'],
    queryFn: getScheduledTasks,
  });

  await queryClient.prefetchQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });

  await queryClient.prefetchQuery({
    queryKey: ['devices'],
    queryFn: getDevices,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Scheduler />
    </HydrationBoundary>
  );
};

export default SchedulerPage;
