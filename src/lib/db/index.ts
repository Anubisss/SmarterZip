import Database from 'better-sqlite3';

if (!process.env.DATABASE_PATH) {
  // eslint-disable-next-line no-console
  console.error('DATABASE_PATH is not configured');
  process.exit(1);
}

const db = new Database(process.env.DATABASE_PATH, {
  fileMustExist: true,
  // eslint-disable-next-line no-console
  verbose: process.env.DATABASE_LOGGING_ENABLED === 'true' ? console.log : undefined,
});

const setup = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS "scheduled_tasks" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "roomId" INTEGER,
      "deviceId" INTEGER,
      "deviceStateUuid" TEXT,
      "action" TEXT,
      "when" TEXT,
      "createdAt" TEXT,
      "lastExecutedAt" TEXT
    )
  `);
};

setup();
export default db;
