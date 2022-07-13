import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';
import customCounterReducer from './features/customCounter/customCounterSlice';

import { Redux } from './Redux';

describe('Redux Integration Test', () => {
  let store: Store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });
  it('Should display value with increment by 1 per click', async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    await userEvent.click(screen.getByText('+'));
    await userEvent.click(screen.getByText('+'));
    await userEvent.click(screen.getByText('+'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('3');
  });
  it('Should display value with decrement by 1 per click', async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    await userEvent.click(screen.getByText('-'));
    await userEvent.click(screen.getByText('-'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('-2');
  });
  it('Should display value with increment by amount', async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    await userEvent.type(screen.getByPlaceholderText('Enter'), '30');
    await userEvent.click(screen.getByText('Increment by Amount'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('30');
  });
});
