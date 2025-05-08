'use client';

import React, { FC, useEffect, useMemo, useState } from 'react';

import { useDevices } from '../apiHooks/devices';
import { useRooms } from '../apiHooks/rooms';
import { useDeleteScheduledTask, useScheduledTasks } from '../apiHooks/scheduledTasks';
import Footer from '../components/footer';
import Navigation from '../components/navigation';
import { getDeviceName, getRoomName, sortTasks } from './helpers';
import TaskModal from './taskModal';
import TaskTable from './taskTable';
import { ScheduledTask } from './types';

const Scheduler: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tasksData, error: tasksError } = useScheduledTasks();
  const { data: rooms, error: roomsError } = useRooms();
  const { data: devices, error: devicesError } = useDevices();

  const {
    mutate: deleteScheduledTask,
    error: deleteScheduledTaskError,
    isPending: isDeletingScheduledTask,
  } = useDeleteScheduledTask();

  const tasks: ScheduledTask[] = useMemo(() => {
    if (!rooms || !devices || !tasksData) {
      return [];
    }

    const scheduledTasks = tasksData.map((t) => ({
      ...t,
      roomName: getRoomName(rooms, t.roomId),
      deviceName: getDeviceName(devices, t.deviceId),
    }));
    sortTasks(scheduledTasks);

    return scheduledTasks;
  }, [devices, rooms, tasksData]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const showLoadingIndicator = !tasksData || !rooms || !devices || isDeletingScheduledTask;
  const hasError = !!tasksError || !!roomsError || !!devicesError || !!deleteScheduledTaskError;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-center text-3xl font-bold">Scheduler</h1>
      {showLoadingIndicator && (
        <div className="mt-8 flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
        </div>
      )}
      {!showLoadingIndicator && hasError && (
        <div className="mt-8 text-center text-xl text-red-500">
          Can&apos;t load scheduler. Try reload.
        </div>
      )}
      {!showLoadingIndicator && !hasError && (
        <div className="my-8">
          <h3 className="text-center text-2xl">Tasks</h3>
          <div className="mb-8 mt-2 text-center">
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              New task
            </button>
          </div>
          {tasks.length === 0 && <div className="mt-8 text-center text-xl font-bold">No tasks</div>}
          {tasks.length > 0 && (
            <TaskTable tasks={tasks} devices={devices} onDeleteTask={deleteScheduledTask} />
          )}
        </div>
      )}
      {!showLoadingIndicator && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          rooms={rooms}
          devices={devices}
        />
      )}
      <Navigation />
      <Footer />
    </div>
  );
};

export default Scheduler;
