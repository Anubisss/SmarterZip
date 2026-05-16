import { NextResponse } from 'next/server';

import ScheduledTaskRepository from '@/lib/db/repositories/scheduledTask';

export const DELETE = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    ScheduledTaskRepository.delete(+id);
    return NextResponse.json({});
  } catch (ex: any) {
    return NextResponse.json(
      { name: ex.name, message: ex.toString(), code: ex.code },
      { status: 500 },
    );
  }
};
