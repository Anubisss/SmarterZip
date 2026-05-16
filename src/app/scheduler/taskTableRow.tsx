import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { MdDelete } from 'react-icons/md';
import { PiLampPendantFill, PiLampPendantLight } from 'react-icons/pi';

import BlindsIcon from '../home/devices/shutterSwitch/blindsIcon';
import { Device } from '../home/types';
import { ScheduledTask } from './types';

const LocalTime = dynamic(() => import('./localTime'), {
  ssr: false,
  loading: () => (
    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-t-2 border-blue-500"></div>
  ),
});

interface Props {
  task: ScheduledTask;
  device?: Device;
  onDelete: (taskId: number) => void;
  onToggleActive: (taskId: number) => void;
}

const TaskTableRow: FC<Props> = ({ task, device, onDelete, onToggleActive }) => {
  const isActive = task.active === 1;

  const handleDeleteClick = (taskId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      onDelete(taskId);
    }
  };

  return (
    <tr
      className={`border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 ${
        isActive
          ? 'bg-white dark:bg-gray-800'
          : 'bg-gray-100 text-gray-400 dark:bg-gray-900 dark:text-gray-500'
      }`}
      key={task.id}
    >
      <td className="p-2 text-center">{task.roomName}</td>
      <td className="p-2 text-center">{task.deviceName}</td>
      <td className="p-2 text-center">
        <LocalTime time={task.when} format="HH:mm" />
      </td>
      <td className="flex items-center justify-center p-2 text-center">
        {device?.type === 'shutterSwitch' ? (
          <>
            <BlindsIcon value={+task.action} showHeight={false} />
            <div className="ml-1">{100 - +task.action}%</div>
          </>
        ) : device?.type === 'lampSwitch' ? (
          <>
            {task.action === 'true' ? (
              <PiLampPendantFill className="mr-1 h-12 w-12" color="#eab308" />
            ) : (
              <PiLampPendantLight className="mr-1 h-12 w-12" />
            )}
            <div>{task.action === 'true' ? 'Turn ON' : 'Turn OFF'}</div>
          </>
        ) : null}
      </td>
      <td className="p-2 text-center">
        <button
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors duration-200 ${
            isActive
              ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800'
              : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800'
          }`}
          onClick={() => onToggleActive(task.id)}
          aria-label={isActive ? 'Deactivate task' : 'Activate task'}
          tabIndex={0}
        >
          {isActive ? 'Active' : 'Inactive'}
        </button>
      </td>
      <td className="p-2 text-center">
        <LocalTime dateTime={task.createdAt} format="YYYY MMMM DD, HH:mm:ss" />
      </td>
      <td className="p-2 text-center">
        {task.lastExecutedAt ? (
          <LocalTime dateTime={task.lastExecutedAt} format="YYYY MMMM DD, HH:mm:ss" />
        ) : (
          '-'
        )}
      </td>
      <td className="h-full p-2">
        <div className="flex h-full items-center justify-center">
          <MdDelete
            className="h-6 w-6 cursor-pointer hover:text-gray-500"
            onClick={() => handleDeleteClick(task.id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default TaskTableRow;
