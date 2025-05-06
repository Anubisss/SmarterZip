import { QueryClient, isServer } from '@tanstack/react-query';

import defaultRetry from '../apiHooks/lib/defaultRetry';

let browserQueryClient: QueryClient | undefined = undefined;

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: defaultRetry,
      },
    },
  });
};

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
};

export default getQueryClient;
