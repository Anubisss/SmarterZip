import { NextResponse } from 'next/server';

import changeState from '../../../[uuid]/changeState';
import getState from '../../../[uuid]/getState';

export const POST = async (req: Request, { params }: { params: Promise<{ uuid: string }> }) => {
  const { uuid } = await params;
  if (!uuid) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    const state = await getState(uuid);
    await changeState(uuid, state.value.value);
    return NextResponse.json({ value: state.value.value });
  } catch (ex: any) {
    if (ex.response?.status) {
      return NextResponse.json({}, { status: ex.response.status });
    }
    return NextResponse.json({ error: 'Unhandled error' }, { status: 500 });
  }
};
