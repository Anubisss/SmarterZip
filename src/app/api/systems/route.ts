import { NextResponse } from 'next/server';

import getSystems from './getSystems';

export const GET = async () => {
  const systems = await getSystems();
  return NextResponse.json(systems);
};
