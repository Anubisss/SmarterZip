import moment from 'moment';

import ScheduledTaskRepository from '../lib/db/repositories/scheduledTask';
import { ScheduledTask } from '../lib/types';

const getLatestTasksPerDevice = (now: string): ScheduledTask[] => {
  const tasks = ScheduledTaskRepository.getAll();

  const tasksBeforeNow = tasks.filter((t) => {
    const whenDate = `${moment(now).format('YYYY-MM-DD')}T${t.when}`;
    return moment.utc(whenDate).isSameOrBefore(now);
  });

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
        const timeA = moment(a.when, 'HH:mm');
        const timeB = moment(b.when, 'HH:mm');
        return timeB.isAfter(timeA) ? 1 : -1;
      });
    })
    .map((tasks) => tasks[0]);

  return latestTasks;
};

export default getLatestTasksPerDevice;
