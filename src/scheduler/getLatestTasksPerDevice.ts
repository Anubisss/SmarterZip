import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';

import ScheduledTaskRepository from '../lib/db/repositories/scheduledTask';
import { ScheduledTask } from '../lib/types';

dayjs.extend(utc);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

const getLatestTasksPerDevice = (now: string): ScheduledTask[] => {
  const tasks = ScheduledTaskRepository.getAll().filter((t) => t.active);

  const tasksBeforeNow = tasks
    .filter((t) => {
      const whenDate = `${dayjs.utc(now).format('YYYY-MM-DD')}T${t.when}`;
      return dayjs.utc(whenDate).isSameOrBefore(now);
    })
    .filter((t) => t.active);

  const tasksPerDevice: { [deviceId: ScheduledTask['deviceId']]: ScheduledTask[] } = {};
  for (const task of tasksBeforeNow) {
    if (!tasksPerDevice[task.deviceId]) {
      tasksPerDevice[task.deviceId] = [];
    }
    tasksPerDevice[task.deviceId].push(task);
  }

  const latestTasks: ScheduledTask[] = Object.values(tasksPerDevice)
    .map((tasks) => {
      return tasks.sort((a, b) => {
        const timeA = dayjs(a.when, 'HH:mm');
        const timeB = dayjs(b.when, 'HH:mm');
        return timeB.isAfter(timeA) ? 1 : -1;
      });
    })
    .map((tasks) => tasks[0]);

  return latestTasks;
};

export default getLatestTasksPerDevice;
