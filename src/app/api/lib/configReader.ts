import fs from 'fs';
import path from 'path';

const CONFIG_DIR = process.env.CONFIG_PATH || path.join(process.cwd(), 'config');

const readJsonConfig = <T>(filename: string): T => {
  const filePath = path.join(CONFIG_DIR, filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as T;
};

export const getRoomsConfig = (): { id: number; name: string }[] => readJsonConfig('rooms.json');

export const getDevicesConfig = (): { id: number; name: string }[] =>
  readJsonConfig('devices.json');

export const getIgnoredDevicesConfig = (): number[] => readJsonConfig('ignoredDevices.json');
