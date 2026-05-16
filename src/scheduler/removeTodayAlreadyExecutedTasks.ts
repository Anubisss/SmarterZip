import dayjs from 'dayjs';

import { ScheduledTask } from '../lib/types';

const removeTodayAlreadyExecutedTasks = (now: string, tasks: ScheduledTask[]): ScheduledTask[] => {
  return tasks.filter((task) => {
    const lastExecutedDay = dayjs(task.lastExecutedAt).format('YYYY-MM-DD');
    const nowDay = dayjs(now).format('YYYY-MM-DD');
    return lastExecutedDay !== nowDay;
  });
};

export default removeTodayAlreadyExecutedTasks;
