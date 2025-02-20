import ScheduledTaskRepository from '../lib/db/repositories/scheduledTask';
import { changeState, getState, isLoginRequired, login, selectSystem } from './apiClient';
import getLatestTasksPerDevice from './getLatestTasksPerDevice';
import removeTodayAlreadyExecutedTasks from './removeTodayAlreadyExecutedTasks';

const executeTasks = async (stopIfLoginRequired = false) => {
  const now = new Date().toISOString();

  const tasks = getLatestTasksPerDevice(now);
  const tasksToExecute = removeTodayAlreadyExecutedTasks(now, tasks);

  for (const task of tasksToExecute) {
    const state = await getState(task.deviceStateUuid);
    if (!state) {
      continue;
    }

    if (isLoginRequired(state)) {
      if (stopIfLoginRequired) {
        return;
      }

      // eslint-disable-next-line no-console
      console.log('[executeTasks] logging needed');
      await login(process.env.SCHEDULER_LOGIN_EMAIL!, process.env.SCHEDULER_LOGIN_PASSWORD!);
      await selectSystem(process.env.SCHEDULER_LOGIN_SYSTEM_UUID!);
      // eslint-disable-next-line no-console
      console.log('[executeTasks] logged in');

      if (!stopIfLoginRequired) {
        await executeTasks(true);
        return;
      }
    }
    if (isLoginRequired(state)) {
      return;
    }

    const { value } = state.value;
    if (value !== task.action) {
      await changeState(task.deviceStateUuid, task.action);
      // eslint-disable-next-line no-console
      console.log(
        `[executeTasks] state changed, taskId: ${task.id}, roomId: ${task.roomId}, deviceId: ${task.deviceId}, currentValue: ${value}, action: ${task.action}`
      );
    } else {
      ScheduledTaskRepository.updateLastExecutedAt(task.id, now);
      // eslint-disable-next-line no-console
      console.log(
        `[executeTasks] task executed, taskId: ${task.id}, roomId: ${task.roomId}, deviceId: ${task.deviceId}, currentValue: ${value}, action: ${task.action}`
      );
    }
  }
};

export default executeTasks;
