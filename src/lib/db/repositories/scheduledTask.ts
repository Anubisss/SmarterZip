import Database from 'better-sqlite3';

import { ScheduledTask } from '../../types';
import db from '../';

const TABLE_NAME = 'scheduled_tasks';

class ScheduledTaskRepository {
  static insert(task: Omit<ScheduledTask, 'id' | 'createdAt' | 'lastExecutedAt'>): void {
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO "${TABLE_NAME}" ("roomId", "deviceId", "deviceStateUuid", "action", "when", "createdAt")
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(task.roomId, task.deviceId, task.deviceStateUuid, task.action, task.when, now);
  }

  static getAll(): ScheduledTask[] {
    const stmt: Database.Statement<[], ScheduledTask> = db.prepare(`SELECT * FROM "${TABLE_NAME}"`);
    return stmt.all();
  }

  static delete(id: number): void {
    const stmt = db.prepare(`DELETE FROM "${TABLE_NAME}" WHERE "id" = ?`);
    stmt.run(id);
  }

  static updateLastExecutedAt(id: number, time: string): void {
    const stmt = db.prepare(`UPDATE "${TABLE_NAME}" SET "lastExecutedAt" = ? WHERE "id" = ?`);
    stmt.run(time, id);
  }
}

export default ScheduledTaskRepository;
