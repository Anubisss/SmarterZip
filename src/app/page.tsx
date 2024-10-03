'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LuRefreshCw } from 'react-icons/lu';

import { Room as RoomType, Device as DeviceType, DeviceState } from './home/types';
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
  const [refreshingDeviceStates, setRefreshingDeviceStates] = useState(false);

  const handleDeviceStateChange = (deviceId: number, stateValue: string) => {
    const device = devices.find((d) => d.id === deviceId);
    if (!device || !device.state) {
      return;
    }

    setDevices((prev) =>
      prev.map((device) => {
        if (device.id === deviceId) {
          return {
            ...device,
            state: {
              ...device.state!,
              value: {
                ...device.state!.value,
                value: stateValue,
              },
            },
          };
        }
        return device;
      })
    );
  };

  const handleRefreshDeviceStates = async () => {
    setRefreshingDeviceStates(true);

    const res = await fetch('/api/devices/states');

    if (res.ok) {
      const states: DeviceState[] = await res.json();

      setDevices((prev) =>
        prev.map((device) => {
          return {
            ...device,
            state: states.find((s) => s.uuid === device.stateUuid),
          };
        })
      );

      setError(false);
    } else {
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      setError(true);
    }

    setRefreshingDeviceStates(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [roomsResponse, devicesResponse, deviceStatesResponse] = await Promise.all([
        fetch('/api/rooms'),
        fetch('/api/devices'),
        fetch('/api/devices/states'),
      ]);
      if (roomsResponse.ok && devicesResponse.ok && deviceStatesResponse.ok) {
        const [roomsData, devicesData, deviceStatesData]: [
          roomsData: RoomType[],
          devicesResponse: DeviceType[],
          deviceStatesData: DeviceState[]
        ] = await Promise.all([
          roomsResponse.json(),
          devicesResponse.json(),
          deviceStatesResponse.json(),
        ]);

        const devicesMergedWithStates: DeviceType[] = devicesData.map((d: DeviceType) => ({
          ...d,
          state: deviceStatesData.find((s) => s.uuid === d.stateUuid),
        }));

        setRooms(roomsData);
        setDevices(devicesMergedWithStates);
      } else {
        if (
          roomsResponse.status === 401 ||
          devicesResponse.status === 401 ||
          deviceStatesResponse.status === 401
        ) {
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
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-3xl font-bold">SmarterZip</h1>
          <div
            className={`ml-2 p-1 text-gray-500 ${refreshingDeviceStates ? '' : 'cursor-pointer'}`}
            title="Refresh device states"
            onClick={!loading && !refreshingDeviceStates ? handleRefreshDeviceStates : undefined}
          >
            <LuRefreshCw className={`text-3xl ${refreshingDeviceStates ? 'animate-spin' : ''}`} />
          </div>
        </div>
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
              <Room
                key={room.id}
                room={room}
                devices={getDevicesForRoom(room.id, devices)}
                isRefreshingDeviceStates={refreshingDeviceStates}
                onDeviceStateChange={handleDeviceStateChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
