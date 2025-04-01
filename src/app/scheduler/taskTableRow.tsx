'use client';

import React, { FC } from 'react';
import { MdDelete } from 'react-icons/md';
import Moment from 'react-moment';
import { PiLampPendantFill, PiLampPendantLight } from 'react-icons/pi';
import moment from 'moment';

import { ScheduledTask } from './types';
import { Device } from '../home/types';
import BlindsIcon from '../home/devices/shutterSwitch/blindsIcon';

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
    <tr className="bg-white border-b hover:bg-gray-50" key={task.id}>
      <td className="p-2 text-center">{task.roomName}</td>
      <td className="p-2 text-center">{task.deviceName}</td>
      <td className="p-2 text-center">
        <Moment format="HH:mm">{`${moment.utc().format('YYYY-MM-DD')}T${task.when}:00Z`}</Moment>
      </td>
      <td className="p-2 text-center flex justify-center items-center">
        {device?.type === 'shutterSwitch' ? (
          <>
            <BlindsIcon value={+task.action} showHeight={false} />
            <div className="ml-1">{100 - +task.action}%</div>
          </>
        ) : device?.type === 'lampSwitch' ? (
          <>
            {task.action === 'true' ? (
              <PiLampPendantFill className="w-12 h-12 mr-1" color="#eab308" />
            ) : (
              <PiLampPendantLight className="w-12 h-12 mr-1" />
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
      <td className="p-2 h-full">
        <div className="flex h-full items-center justify-center">
          <MdDelete
            className="w-6 h-6 cursor-pointer hover:text-gray-500"
            onClick={() => onDeleteIconClick(task.id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default TaskTableRow;
