import { NextResponse } from 'next/server';

import changeState from './changeState';

export const PUT = async (req: Request, { params }: { params: { uuid: string } }) => {
  const uuid = params.uuid;
  if (!uuid) {
    return NextResponse.json({}, { status: 400 });
  }

  const { value } = await req.json();

  try {
    await changeState(uuid, value);
    return NextResponse.json({});
  } catch (ex: any) {
    if (ex.response && ex.response.status) {
      return NextResponse.json({}, { status: ex.response.status });
    } else {
      return NextResponse.json({ error: 'Unhandled error' }, { status: 500 });
    }
  }
};
