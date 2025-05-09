import { render, screen } from '@testing-library/react';
import React from 'react';

import Footer from './footer';

describe('Footer', () => {
  it('renders with a link to the GitHub repo', () => {
    render(<Footer />);

    const link = screen.getByRole('link', { name: /smarterzip/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/Anubisss/SmarterZip');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
