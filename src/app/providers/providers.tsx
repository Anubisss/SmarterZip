'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import GlobalQueryErrorHandler from './globalQueryErrorHandler';
import getQueryClient from './queryClient';

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalQueryErrorHandler queryClient={queryClient} />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
