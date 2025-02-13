'use client';

import React, { FC, useEffect, useMemo, useState } from 'react';

import TaskModal from './taskModal';
import Footer from '../components/footer';
import { ScheduledTask } from './types';
import { getDeviceName, getRoomName, sortTasks } from './helpers';
import TaskTable from './taskTable';
import Navigation from '../components/navigation';
import { useDeleteScheduledTask, useScheduledTasks } from '../apiHooks/scheduledTasks';
import { useRooms } from '../apiHooks/rooms';
import { useDevices } from '../apiHooks/devices';

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
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-center text-3xl font-bold">Scheduler</h1>
      {showLoadingIndicator && (
        <div className="mt-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      {!showLoadingIndicator && hasError && (
        <div className="mt-8 text-xl text-red-500 text-center">
          Can&apos;t load scheduler. Try reload.
        </div>
      )}
      {!showLoadingIndicator && !hasError && (
        <div className="my-8">
          <h3 className="text-2xl text-center">Tasks</h3>
          <div className="text-center mt-2 mb-8">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
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
