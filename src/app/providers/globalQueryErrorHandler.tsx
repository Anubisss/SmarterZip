'use client';

import { QueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { HttpError } from '../apiHooks/lib/httpError';

interface Props {
  queryClient: QueryClient;
}

const GlobalQueryErrorHandler: React.FC<Props> = ({ queryClient }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const queryUnsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event.type === 'updated') {
        const error = event.query.state.error;
        if (error instanceof HttpError && (error.status === 401 || error.status === 403)) {
          if (pathname !== '/login') {
            router.replace('/login?redirected');
          }
        }
      }
    });

    const mutationUnsubscribe = queryClient.getMutationCache().subscribe((event) => {
      if (event.type === 'updated') {
        const error = event.mutation.state.error;
        if (error instanceof HttpError && (error.status === 401 || error.status === 403)) {
          if (pathname !== '/login') {
            router.replace('/login?redirected');
          }
        }
      }
    });

    return () => {
      queryUnsubscribe();
      mutationUnsubscribe();
    };
  }, [pathname, queryClient, router]);

  return null;
};

export default GlobalQueryErrorHandler;
