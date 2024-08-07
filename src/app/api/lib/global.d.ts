import type ZipatoClient from './zipatoClient';

declare global {
  // eslint-disable-next-line no-unused-vars
  var zipatoClient: ZipatoClient | undefined;
}

export {};
