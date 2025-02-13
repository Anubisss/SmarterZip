'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import defaultRetry from '../apiHooks/lib/defaultRetry';
import GlobalQueryErrorHandler from './globalQueryErrorHandler';

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: defaultRetry,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalQueryErrorHandler queryClient={queryClient} />
      {children}
    </QueryClientProvider>
  );
};

export default Providers;
