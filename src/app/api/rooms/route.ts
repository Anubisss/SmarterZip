import { NextResponse } from 'next/server';

import getRooms from './getRooms';

export const GET = async () => {
  try {
    const rooms = await getRooms();
    return NextResponse.json(rooms);
  } catch (ex: any) {
    if ((ex.response && ex.response.status) || ex.status) {
      return NextResponse.json({}, { status: ex.status || ex.response.status });
    } else {
      return NextResponse.json({ error: 'Unhandled error' }, { status: 500 });
    }
  }
};
