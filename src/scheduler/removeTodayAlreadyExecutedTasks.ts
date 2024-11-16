import moment from 'moment';

import { ScheduledTask } from '../lib/types';

const removeTodayAlreadyExecutedTasks = (now: string, tasks: ScheduledTask[]): ScheduledTask[] => {
  return tasks.filter((task) => {
    const lastExecutedDay = moment(task.lastExecutedAt).format('YYYY-MM-DD');
    const nowDay = moment(now).format('YYYY-MM-DD');
    return lastExecutedDay !== nowDay;
  });
};

export default removeTodayAlreadyExecutedTasks;
