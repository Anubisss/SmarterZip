import type ZipatoClient from './zipatoClient';

declare global {
  var zipatoClient: ZipatoClient | undefined;
}

export {};
