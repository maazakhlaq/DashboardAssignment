import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Dashboard header', () => {
  render(<App />);
  const headerElement = screen.getByText(/dashboard/i); // Adjust text if needed
  expect(headerElement).toBeInTheDocument();
});
