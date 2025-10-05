import { NextResponse } from 'next/server';

import getStates from './getStates';

export const GET = async () => {
  try {
    const states = await getStates();
    return NextResponse.json(states);
  } catch (ex: any) {
    if (ex.response && ex.response.status) {
      return NextResponse.json({}, { status: ex.response.status });
    } else {
      return NextResponse.json({ error: 'Unhandled error' }, { status: 500 });
    }
  }
};
