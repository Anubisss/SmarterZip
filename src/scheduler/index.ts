import executeTasks from './executeTasks';

const EXECUTE_TASKS_INTERVAL = 1000 * 60 * 2;

const start = async () => {
  if (!process.env.DATABASE_PATH) {
    // eslint-disable-next-line no-console
    console.error('missing configuration: DATABASE_PATH');
    process.exit(1);
  }
  if (!process.env.API_URL) {
    // eslint-disable-next-line no-console
    console.error('missing configuration: API_URL');
    process.exit(1);
  }
  if (!process.env.SCHEDULER_LOGIN_EMAIL) {
    // eslint-disable-next-line no-console
    console.error('missing configuration: SCHEDULER_LOGIN_EMAIL');
    process.exit(1);
  }
  if (!process.env.SCHEDULER_LOGIN_PASSWORD) {
    // eslint-disable-next-line no-console
    console.error('missing configuration: SCHEDULER_LOGIN_PASSWORD');
    process.exit(1);
  }
  if (!process.env.SCHEDULER_LOGIN_SYSTEM_UUID) {
    // eslint-disable-next-line no-console
    console.error('missing configuration: SCHEDULER_LOGIN_SYSTEM_UUID');
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.log(`[start] executing tasks every ${EXECUTE_TASKS_INTERVAL / 60 / 1000} minute(s)`);
  await executeTasks();
  setInterval(executeTasks, EXECUTE_TASKS_INTERVAL);
};

start();
