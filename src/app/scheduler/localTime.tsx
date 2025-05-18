import moment from 'moment';
import React, { FC } from 'react';
import Moment from 'react-moment';

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
  const value = time ? `${moment.utc().format('YYYY-MM-DD')}T${time}:00Z` : dateTime;
  return <Moment format={format}>{value}</Moment>;
};

export default LocalTime;
