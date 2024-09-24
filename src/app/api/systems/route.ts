import { NextResponse } from 'next/server';

import getSystems from './getSystems';

export const GET = async () => {
  try {
    const systems = await getSystems();
    return NextResponse.json(systems);
  } catch (ex: any) {
    if (ex.response && ex.response.status) {
      return NextResponse.json({}, { status: ex.response.status });
    } else {
      return NextResponse.json({ error: 'Unhandled error' }, { status: 500 });
    }
  }
};
