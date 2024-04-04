import { describe } from 'vitest';
import { withRouter, withStore } from '../../util';
import { NotFound } from './404';
import { render, screen } from '@testing-library/react';
import { Addresses } from '../../const';
import { act } from 'react-dom/test-utils';

describe('Component: NotFound', () => {
  const preparedComponent = withStore(withRouter(<NotFound />)).withStoreComponent;

  it('should display text "Page not found"', () => {
    const expectedText = /Page not found/i;
    render(preparedComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });


  it('should display link to main page', () => {
    const expectedText = /To Main/i;
    render(preparedComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should redirect to main page when clicking on link', () => {
    const expectedText = /To Main/i;
    render(preparedComponent);
    act(() => {
      screen.getByText(expectedText).click();
    });
    expect(window.location.pathname).toBe(Addresses.Main);
  });

});
