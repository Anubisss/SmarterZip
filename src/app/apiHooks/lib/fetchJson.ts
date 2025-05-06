import { HttpError } from './httpError';

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
  return await response.json();
};

export default fetchJson;
