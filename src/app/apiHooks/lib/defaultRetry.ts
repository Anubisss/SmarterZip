import { MAX_RETRIES } from './constants';
import { HttpError } from './httpError';

const defaultRetry = (failureCount: number, error: unknown): boolean => {
  if (error instanceof HttpError && (error.status === 401 || error.status === 403)) {
    return false;
  }
  return failureCount < MAX_RETRIES;
};

export default defaultRetry;
