'use client';

import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Device, Room } from '../home/types';
import TaskModal from './taskModal';
import Footer from '../components/footer';
import { ScheduledTask, ScheduledTaskDTO } from './types';
import { getDeviceName, getRoomName, sortTasks } from './helpers';
import TaskTable from './taskTable';
import Navigation from '../components/navigation';

const Scheduler: FC = () => {
  const router = useRouter();

  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reloadTasks = async () => {
    setLoading(true);

    const tasksResponse = await fetch('/api/scheduled-tasks');
    if (tasksResponse.ok) {
      const tasksData: ScheduledTaskDTO[] = await tasksResponse.json();
      const scheduledTasks = tasksData.map((t) => ({
        ...t,
        roomName: getRoomName(rooms, t.roomId),
        deviceName: getDeviceName(devices, t.deviceId),
      }));
      sortTasks(scheduledTasks);

      setTasks(scheduledTasks);
      setError(false);
    } else {
      setError(true);
    }

    setLoading(false);
  };

  const handleDeleteTask = async (id: number) => {
    setLoading(true);

    const res = await fetch(`/api/scheduled-tasks/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setError(false);
    } else {
      setError(true);
    }

    setLoading(false);
    if (res.ok) {
      await reloadTasks();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [tasksResponse, roomsResponse, devicesResponse] = await Promise.all([
        fetch('/api/scheduled-tasks'),
        fetch('/api/rooms'),
        fetch('/api/devices'),
      ]);
      if (tasksResponse.ok && roomsResponse.ok && devicesResponse.ok) {
        const [tasksData, roomsData, devicesData]: [
          tasksData: ScheduledTaskDTO[],
          roomsData: Room[],
          devicesResponse: Device[]
        ] = await Promise.all([tasksResponse.json(), roomsResponse.json(), devicesResponse.json()]);

        const scheduledTasks = tasksData.map((t) => ({
          ...t,
          roomName: getRoomName(roomsData, t.roomId),
          deviceName: getDeviceName(devicesData, t.deviceId),
        }));
        sortTasks(scheduledTasks);

        devicesData.sort((a, b) => a.name.localeCompare(b.name));

        setTasks(scheduledTasks);
        setRooms(roomsData);
        setDevices(devicesData);
      } else {
        if (roomsResponse.status === 401 || devicesResponse.status === 401) {
          router.push('/login');
          return;
        }
        setError(true);
      }

      setLoading(false);
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-center text-3xl font-bold">Scheduler</h1>
      {loading && (
        <div className="mt-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      {!loading && error && (
        <div className="mt-8 text-xl text-red-500 text-center">
          Can&apos;t load scheduler. Try reload.
        </div>
      )}
      {!loading && !error && (
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
            <TaskTable tasks={tasks} devices={devices} onDeleteTask={handleDeleteTask} />
          )}
        </div>
      )}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdd={reloadTasks}
        rooms={rooms}
        devices={devices}
      />
      <Navigation />
      <Footer />
    </div>
  );
};

export default Scheduler;
