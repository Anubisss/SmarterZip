import { NextResponse } from 'next/server';

import getDevices from './getDevices';

export const GET = async () => {
  try {
    const devices = await getDevices();
    return NextResponse.json(devices);
  } catch (ex: any) {
    if (ex.response && ex.response.status) {
      return NextResponse.json({}, { status: ex.response.status });
    } else {
      return NextResponse.json({ error: 'Unhandled error' }, { status: 500 });
    }
  }
};
