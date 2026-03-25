import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './components/Home';

test('renders tests playground heading', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const headingElement = screen.getByText(/Welcome to Tests Playground/i);
  expect(headingElement).toBeInTheDocument();
});
