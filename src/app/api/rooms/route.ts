import { NextResponse } from 'next/server';

import getRooms from './getRooms';

export const GET = async () => {
  const rooms = await getRooms();
  return NextResponse.json(rooms);
};
