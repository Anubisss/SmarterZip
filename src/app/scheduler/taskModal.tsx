'use client';

import React, { FC, FormEvent, useEffect, useState } from 'react';

import { useCreateScheduledTask } from '../apiHooks/scheduledTasks';
import BlindsIcon from '../home/devices/shutterSwitch/blindsIcon';
import { Device, Room } from '../home/types';
import { getDeviceTypeName, getUtcTimeFromLocalTime } from './helpers';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  devices: Device[];
}

const TaskModal: FC<Props> = ({ isOpen, onClose, rooms, devices }) => {
  const [roomId, setRoomId] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [when, setWhen] = useState('');
  const [action, setAction] = useState('');

  const { mutateAsync: createScheduledTask, error, isPending } = useCreateScheduledTask();

  const handleNewTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending) {
      return;
    }
    if (!roomId || !deviceId || !when || !action) {
      return;
    }
    const device = devices.find((d) => d.id === +deviceId);
    if (!device || !device.stateUuid) {
      return;
    }
    if (device.type === 'lampSwitch' && action !== 'true' && action !== 'false') {
      return;
    }
    if (device.type === 'shutterSwitch' && (+action < 0 || +action > 100)) {
      return;
    }

    await createScheduledTask({
      roomId: +roomId,
      deviceId: +deviceId,
      deviceStateUuid: device.stateUuid,
      when: getUtcTimeFromLocalTime(when),
      action,
    });
    onClose();
  };

  useEffect(() => {
    const device = devices.find((d) => d.id === +deviceId);
    if (device) {
      if (device.type === 'shutterSwitch') {
        setAction('50');
        return;
      }
    }
    setAction('');
  }, [deviceId, devices]);

  useEffect(() => {
    if (isOpen) {
      setRoomId('');
      setDeviceId('');
      setWhen('');
      setAction('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const roomDevices =
    roomId !== '' ? devices.filter((d) => d.roomId === +roomId && d.stateUuid) : [];
  const selectedDeviceType: undefined | Device['type'] =
    roomId !== '' && deviceId !== ''
      ? roomDevices.find((d) => d.id === +deviceId)?.type
      : undefined;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="max-h-screen w-96 overflow-y-auto rounded border border-black bg-white p-6 shadow-lg">
        <form onSubmit={handleNewTask}>
          <h2 className="mb-5 text-2xl font-bold">New Task</h2>
          <div className="mb-1">
            <label className="mb-2 block font-bold">Room</label>
            <select
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
                setDeviceId('');
              }}
              className="mb-4 w-full rounded border border-gray-300 p-2"
              required
            >
              <option value="" disabled hidden>
                Choose a room
              </option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-1">
            <label className="mb-2 block font-bold">Device</label>
            <select
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              className="mb-4 w-full rounded border border-gray-300 p-2"
              required
            >
              <option value="" disabled hidden>
                Choose a device
              </option>
              {roomDevices.map((device) => (
                <option key={device.id} value={device.id}>
                  [{getDeviceTypeName(device.type)}] {device.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-bold">When</label>
            <input type="time" value={when} onChange={(e) => setWhen(e.target.value)} required />
          </div>
          <div className="mb-1">
            <label className="mb-2 block font-bold">Action</label>
            {!selectedDeviceType && <div className="mb-8">Choose room and device first.</div>}
            {selectedDeviceType === 'lampSwitch' && (
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="mb-4 w-full rounded border border-gray-300 p-2"
                required
              >
                <option value="" disabled hidden>
                  Choose an action
                </option>
                <option value="true">Turn ON</option>
                <option value="false">Turn OFF</option>
              </select>
            )}
            {selectedDeviceType === 'shutterSwitch' && (
              <div className="relative flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="h-132 [writing-mode:vertical-lr]"
                  value={100 - +action}
                  onChange={(e) => setAction((100 - +e.target.value).toString())}
                />
                <span className="ml-8">
                  <BlindsIcon value={+action} />
                </span>
              </div>
            )}
          </div>
          {isPending && (
            <div className="flex items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
            </div>
          )}
          {!isPending && error && (
            <div className="mb-4">
              <p className="text-red-500">Wasn&apos;t able to create a new task. Try again.</p>
            </div>
          )}
          {!isPending && (
            <div className="flex justify-end space-x-4">
              <button
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                type="submit"
              >
                Add
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
