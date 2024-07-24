import { NextResponse } from 'next/server';

import selectSystem from './selectSystem';

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const uuid = url.searchParams.get('uuid');
  if (!uuid) {
    return NextResponse.json({}, { status: 400 });
  }

  const success = await selectSystem(uuid);
  return NextResponse.json({}, { status: success ? 200 : 400 });
};
