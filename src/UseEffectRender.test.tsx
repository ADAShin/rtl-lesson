import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { UseEffectRender } from './UseEffectRender';

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

describe('useEffect rendering', () => {
  it('Should render only after async function resoleved', async () => {
    render(<UseEffectRender />);
    const userElem = await screen.findByText(/I am/);
    expect(userElem).toBeInTheDocument();
  });
});
