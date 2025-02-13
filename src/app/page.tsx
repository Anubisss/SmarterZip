'use client';

import React, { useMemo } from 'react';
import { LuRefreshCw } from 'react-icons/lu';

import { Device as DeviceType } from './home/types';
import Room from './home/room';
import Footer from './components/footer';
import Navigation from './components/navigation';
import { useRooms } from './apiHooks/rooms';
import { useDevices } from './apiHooks/devices';
import { useDeviceStates } from './apiHooks/deviceStates';

const getDevicesForRoom = (roomId: number, devices: DeviceType[]): DeviceType[] => {
  return devices.filter((device) => device.roomId === roomId);
};

const Home = () => {
  const { data: rooms, error: roomsError } = useRooms();
  const { data: devices, error: devicesError } = useDevices();
  const {
    data: deviceStates,
    error: deviceStatesError,
    isFetching: isFetchingDeviceStates,
    refetch: refetchDeviceStates,
  } = useDeviceStates({ refreshEnabled: true });

  const devicesWithStates: DeviceType[] = useMemo(() => {
    if (!devices || !deviceStates) {
      return [];
    }

    const devicesMergedWithStates: DeviceType[] = devices.map((d: DeviceType) => ({
      ...d,
      state: deviceStates.find((s) => s.uuid === d.stateUuid),
    }));
    devicesMergedWithStates.sort((a, b) => a.name.localeCompare(b.name));

    return devicesMergedWithStates;
  }, [devices, deviceStates]);

  const showLoadingIndicator = !rooms || !devices || !deviceStates;
  const hasError = !!roomsError || !!devicesError || !!deviceStatesError;

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-3xl font-bold">SmarterZip</h1>
          {!showLoadingIndicator && (
            <div
              className={`ml-2 p-1 text-gray-500 ${isFetchingDeviceStates ? '' : 'cursor-pointer'}`}
              title="Refresh device states"
              onClick={!isFetchingDeviceStates ? () => refetchDeviceStates() : undefined}
            >
              <LuRefreshCw className={`text-3xl ${isFetchingDeviceStates ? 'animate-spin' : ''}`} />
            </div>
          )}
        </div>
        {showLoadingIndicator && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}
        {!showLoadingIndicator && hasError && (
          <p className="text-xl text-red-500 text-center">
            Can&apos;t load the systems. Try reload.
          </p>
        )}
        {!showLoadingIndicator && !hasError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {rooms.map((room) => (
              <Room
                key={room.id}
                room={room}
                devices={getDevicesForRoom(room.id, devicesWithStates)}
                isRefreshingDeviceStates={isFetchingDeviceStates}
              />
            ))}
          </div>
        )}
      </div>
      <Navigation />
      <Footer />
    </div>
  );
};

export default Home;
