import { fireEvent, render, screen } from '@testing-library/react';
import GameOfLife from '@components/GameOfLife';
import '@testing-library/jest-dom';

it('renders', () => {
  const { container } = render(<GameOfLife />);
  expect(container).toBeTruthy();
});

it('should add a button for all cells', () => {
  render(<GameOfLife />);

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      expect(screen.getByTestId(`cell-${x}-${y}-dead`)).toBeInTheDocument();
    }
  }
});

it('should turn dead cell alive when clicked', () => {
  render(<GameOfLife />);
  fireEvent.click(screen.getByTestId(`cell-0-0-dead`));

  expect(screen.getByTestId(`cell-0-0-alive`)).toBeInTheDocument();
});

it('should turn alive cell to dead when clicked', () => {
  render(<GameOfLife />);
  fireEvent.click(screen.getByTestId(`cell-0-0-dead`));
  fireEvent.click(screen.getByTestId(`cell-0-0-alive`));

  expect(screen.getByTestId(`cell-0-0-dead`)).toBeInTheDocument();
});
