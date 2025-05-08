'use client';

import React, { FC } from 'react';

import { Device } from '../home/types';
import TaskTableRow from './taskTableRow';
import { ScheduledTask } from './types';

interface Props {
  tasks: ScheduledTask[];
  devices: Device[];
  onDeleteTask: (taskId: number) => void;
}

const TaskTable: FC<Props> = ({ tasks, devices, onDeleteTask }) => {
  return (
    <div className="mx-auto max-w-[1600px] overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3">Room</th>
            <th className="p-3">Device</th>
            <th className="p-3">When</th>
            <th className="p-3">Action</th>
            <th className="p-3">Created</th>
            <th className="p-3">Last executed</th>
            <th className="p-3">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {tasks.map((task) => (
            <TaskTableRow
              key={task.id}
              task={task}
              device={devices.find((d) => d.id === task.deviceId)}
              onDelete={onDeleteTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
