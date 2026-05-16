import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FC } from 'react';

dayjs.extend(utc);

interface TimeProps {
  time: string;
  dateTime?: never;
  format: string;
}

interface DateProps {
  time?: never;
  dateTime: string;
  format: string;
}

type Props = TimeProps | DateProps;

const LocalTime: FC<Props> = ({ dateTime, time, format }) => {
  const value = time ? `${dayjs.utc().format('YYYY-MM-DD')}T${time}:00Z` : dateTime!;
  return <span>{dayjs(value).format(format)}</span>;
};

export default LocalTime;
