import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';
import customCounterReducer from './features/customCounter/customCounterSlice';

import { ReduxAsync } from './ReduxAsync';

describe('Redux Async Integration Test', () => {
  let store: Store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });
  it('Shoud display value with 100 + payload', async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    await userEvent.click(screen.getByText('FetchDummy'));
    await act(() => {
      return new Promise((r) => setTimeout(r, 2000));
    });
    expect(screen.getByTestId('count-value')).toHaveTextContent('105');
  });
});
