import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';
import customCounterReducer from './features/customCounter/customCounterSlice';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { ReduxAsync } from './ReduxAsync';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: 'Bref dummy' }));
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});

describe('Redux Async API Mocking', () => {
  let store: Store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });
  it('[fetch success] Should display username in h3 tag', async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    const fetchJsonButton = screen.getByRole('button', { name: 'FetchJSON' });
    // eslint-disable-next-line testing-library/no-debugging-utils
    //screen.debug(fetchJsonButton);
    userEvent.click(fetchJsonButton);
    expect(await screen.findByRole('heading')).toHaveTextContent('Bref dummy');
  });
  it('[fetch failed] Should display anonymous in h3 tag', async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users/1',
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    const fetchJsonButton = screen.getByRole('button', { name: 'FetchJSON' });
    userEvent.click(fetchJsonButton);
    expect(await screen.findByRole('heading')).toHaveTextContent('anonymous');
  });
});
