import { NextResponse } from 'next/server';

import getDevices from './getDevices';

export const GET = async () => {
  const devices = await getDevices();
  return NextResponse.json(devices);
};
