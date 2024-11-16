import { NextResponse } from 'next/server';

import ScheduledTaskRepository from '@/lib/db/repositories/scheduledTask';
import { ScheduledTask } from '@/lib/types';

export const GET = async () => {
  try {
    const tasks = ScheduledTaskRepository.getAll();
    return NextResponse.json(tasks);
  } catch (ex: any) {
    return NextResponse.json(
      { name: ex.name, message: ex.toString(), code: ex.code },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  const {
    roomId,
    deviceId,
    deviceStateUuid,
    when,
    action,
  }: Omit<ScheduledTask, 'id' | 'createdAt' | 'lastExecutedAt'> = await req.json();

  try {
    ScheduledTaskRepository.insert({
      roomId,
      deviceId,
      deviceStateUuid,
      when,
      action,
    });
  } catch (ex: any) {
    return NextResponse.json(
      { name: ex.name, message: ex.toString(), code: ex.code },
      { status: 500 }
    );
  }

  return NextResponse.json({});
};
