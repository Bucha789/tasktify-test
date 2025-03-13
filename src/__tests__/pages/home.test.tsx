import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomePage } from '../../pages/home';
import { renderWithProviders } from '../../utils/test-utils';

describe('Home', () => {
  it('should render', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText('Tasktify')).not.toBeNull();
  });

  it('should render the task creator', () => {
    renderWithProviders(<HomePage />);
    const taskCreator = screen.getByTestId('task-creator');
    expect(taskCreator).not.toBeNull();
  });
  
}); 