'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Room as RoomType, Device as DeviceType } from './home/types';
import Room from './home/room';

const getDevicesForRoom = (roomId: number, devices: DeviceType[]): DeviceType[] => {
  return devices.filter((device) => device.roomId === roomId);
};

const Home = () => {
  const router = useRouter();

  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [devices, setDevices] = useState<DeviceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [roomsResponse, devicesResponse] = await Promise.all([
        fetch('/api/rooms'),
        fetch('/api/devices'),
      ]);
      if (roomsResponse.ok && devicesResponse.ok) {
        const [roomsData, devicesData] = await Promise.all([
          roomsResponse.json(),
          devicesResponse.json(),
        ]);

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

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">SmarterZip</h1>
        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}
        {!loading && error && (
          <p className="text-xl text-red-500 text-center">
            Can&apos;t load the systems. Try reload.
          </p>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Room key={room.id} room={room} devices={getDevicesForRoom(room.id, devices)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
