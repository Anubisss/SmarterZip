import type { Database as SQLiteDatabase } from 'better-sqlite3';
import Database from 'better-sqlite3';

let dbInstance: SQLiteDatabase;

const setup = (db: SQLiteDatabase) => {
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

const getDb = (): SQLiteDatabase => {
  if (dbInstance) {
    return dbInstance;
  }

  if (!process.env.DATABASE_PATH) {
    // eslint-disable-next-line no-console
    console.error('DATABASE_PATH is not configured');
    process.exit(1);
  }

  dbInstance = new Database(process.env.DATABASE_PATH, {
    fileMustExist: true,
    // eslint-disable-next-line no-console
    verbose: process.env.DATABASE_LOGGING_ENABLED === 'true' ? console.log : undefined,
  });

  setup(dbInstance);

  return dbInstance;
};

export default getDb;
