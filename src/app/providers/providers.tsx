'use client';

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

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
    </QueryClientProvider>
  );
};

export default Providers;
