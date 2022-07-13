import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { MockServer } from './MockServer';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1, username: 'Bred dummy' }));
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

describe('Mocking API', () => {
  it('[Fetch success]Should display fetched data correctly and button disable', async () => {
    render(<MockServer />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const userElem = await screen.findByRole('heading');
    expect(userElem).toHaveTextContent('Bred dummy');
    expect(button).toBeDisabled();
  });
  it('[Fetch fail]Should display error message no render header and button able', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users/1',
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(<MockServer />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const errorElem = await screen.findByTestId('error');
    expect(errorElem).toHaveTextContent('Fetching Failed !');
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(button).toBeEnabled();
  });
});
