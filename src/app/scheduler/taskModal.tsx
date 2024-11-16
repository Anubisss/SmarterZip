'use client';

import React, { FC, FormEvent, useEffect, useState } from 'react';

import { Device, Room } from '../home/types';
import BlindsIcon from '../home/devices/shutterSwitch/blindsIcon';
import { getDeviceTypeName, getUtcTimeFromLocalTime } from './helpers';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdd: () => void;
  rooms: Room[];
  devices: Device[];
}

const TaskModal: FC<Props> = ({ isOpen, onClose, onTaskAdd, rooms, devices }) => {
  const [roomId, setRoomId] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [when, setWhen] = useState('');
  const [action, setAction] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleNewTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) {
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
    setLoading(true);

    const res = await fetch('/api/scheduled-tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomId: +roomId,
        deviceId: +deviceId,
        deviceStateUuid: device.stateUuid,
        when: getUtcTimeFromLocalTime(when),
        action,
      }),
    });

    if (res.ok) {
      setError(false);
      setLoading(false);
      onClose();
      onTaskAdd();
    } else {
      setError(true);
      setLoading(false);
    }
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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96 border border-black max-h-screen overflow-y-auto">
        <form onSubmit={handleNewTask}>
          <h2 className="text-2xl font-bold mb-5">New Task</h2>
          <div className="mb-1">
            <label className="block mb-2 font-bold">Room</label>
            <select
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
                setDeviceId('');
              }}
              className="w-full mb-4 border border-gray-300 rounded p-2"
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
            <label className="block mb-2 font-bold">Device</label>
            <select
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              className="w-full mb-4 border border-gray-300 rounded p-2"
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
            <label className="block mb-2 font-bold">When</label>
            <input type="time" value={when} onChange={(e) => setWhen(e.target.value)} required />
          </div>
          <div className="mb-1">
            <label className="block mb-2 font-bold">Action</label>
            {!selectedDeviceType && <div className="mb-8">Choose room and device first.</div>}
            {selectedDeviceType === 'lampSwitch' && (
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full mb-4 border border-gray-300 rounded p-2"
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
                  className="[writing-mode:vertical-lr] h-132"
                  value={100 - +action}
                  onChange={(e) => setAction((100 - +e.target.value).toString())}
                />
                <span className="ml-8">
                  <BlindsIcon value={+action} />
                </span>
              </div>
            )}
          </div>
          {loading && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
          )}
          {!loading && error && (
            <div className="mb-4">
              <p className="text-red-500">Wasn&apos;t able to create a new task. Try again.</p>
            </div>
          )}
          {!loading && (
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
