import { render, screen } from '@testing-library/react';
import React from 'react';

import Navigation from './navigation';

describe('Navigation', () => {
  it('renders Home and Scheduler links', () => {
    render(<Navigation />);

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /scheduler/i })).toBeInTheDocument();

    expect(screen.getByText('Home')).toHaveAttribute('href', '/');
    expect(screen.getByText('Scheduler')).toHaveAttribute('href', '/scheduler');
  });
});
