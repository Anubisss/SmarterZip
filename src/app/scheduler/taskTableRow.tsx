'use client';

import moment from 'moment';
import React, { FC } from 'react';
import { MdDelete } from 'react-icons/md';
import { PiLampPendantFill, PiLampPendantLight } from 'react-icons/pi';
import Moment from 'react-moment';

import BlindsIcon from '../home/devices/shutterSwitch/blindsIcon';
import { Device } from '../home/types';
import { ScheduledTask } from './types';

interface Props {
  task: ScheduledTask;
  device?: Device;
  onDelete: (taskId: number) => void;
}

const TaskTableRow: FC<Props> = ({ task, device, onDelete }) => {
  const onDeleteIconClick = (taskId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      onDelete(taskId);
    }
  };

  return (
    <tr
      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      key={task.id}
    >
      <td className="p-2 text-center">{task.roomName}</td>
      <td className="p-2 text-center">{task.deviceName}</td>
      <td className="p-2 text-center">
        <Moment format="HH:mm">{`${moment.utc().format('YYYY-MM-DD')}T${task.when}:00Z`}</Moment>
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
        <Moment format="YYYY MMMM DD, HH:mm:ss">{task.createdAt}</Moment>
      </td>
      <td className="p-2 text-center">
        {task.lastExecutedAt ? (
          <Moment format="YYYY MMMM DD, HH:mm:ss">{task.lastExecutedAt}</Moment>
        ) : (
          '-'
        )}
      </td>
      <td className="h-full p-2">
        <div className="flex h-full items-center justify-center">
          <MdDelete
            className="h-6 w-6 cursor-pointer hover:text-gray-500"
            onClick={() => onDeleteIconClick(task.id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default TaskTableRow;
