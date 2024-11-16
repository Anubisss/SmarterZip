import { NextResponse } from 'next/server';

import ScheduledTaskRepository from '@/lib/db/repositories/scheduledTask';

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const id = params.id;
  if (!id) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    ScheduledTaskRepository.delete(+id);
    return NextResponse.json({});
  } catch (ex: any) {
    return NextResponse.json(
      { name: ex.name, message: ex.toString(), code: ex.code },
      { status: 500 }
    );
  }
};
