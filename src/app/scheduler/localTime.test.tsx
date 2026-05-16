import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import LocalTime from './localTime';

dayjs.extend(utc);

describe('LocalTime', () => {
  it('dateTime', () => {
    render(<LocalTime dateTime="2024-01-01T10:13:00Z" format="YYYY-MM-DD HH:mm" />);
    expect(screen.getByText('2024-01-01 10:13')).toBeInTheDocument();
  });

  describe('time', () => {
    it('only time', () => {
      render(<LocalTime time="08:33" format="HH:mm" />);
      expect(screen.getByText('08:33')).toBeInTheDocument();
    });

    it('date (today) and time', () => {
      const today = dayjs.utc().format('YYYY-MM-DD');

      render(<LocalTime time="09:41" format="YYYY-MM-DD HH:mm" />);
      expect(screen.getByText(`${today} 09:41`)).toBeInTheDocument();
    });
  });
});
