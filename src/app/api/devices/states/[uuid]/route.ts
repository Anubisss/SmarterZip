import { NextResponse } from 'next/server';

import changeState from './changeState';
import getState from './getState';

export const GET = async (req: Request, { params }: { params: { uuid: string } }) => {
  const uuid = params.uuid;
  if (!uuid) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    const state = await getState(uuid);
    return NextResponse.json(state);
  } catch (ex: any) {
    if (ex.response && ex.response.status) {
      return NextResponse.json({}, { status: ex.response.status });
    } else {
      return NextResponse.json({ error: 'Unhandled error' }, { status: 500 });
    }
  }
};

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
