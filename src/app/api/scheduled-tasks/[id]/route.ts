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

export const PUT = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    const body = await req.json();
    const { action, when } = body as { action: string; when: string };
    if (!action || !when) {
      return NextResponse.json({ message: 'action and when are required' }, { status: 400 });
    }
    ScheduledTaskRepository.update(+id, action, when);
    return NextResponse.json({});
  } catch (ex: any) {
    return NextResponse.json(
      { name: ex.name, message: ex.toString(), code: ex.code },
      { status: 500 },
    );
  }
};

export const PATCH = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    ScheduledTaskRepository.toggleActive(+id);
    return NextResponse.json({});
  } catch (ex: any) {
    return NextResponse.json(
      { name: ex.name, message: ex.toString(), code: ex.code },
      { status: 500 },
    );
  }
};
