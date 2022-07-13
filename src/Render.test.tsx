import { render, screen } from '@testing-library/react';
import { Render } from './Render';

describe('Rendering', () => {
  it('Should render all the ellements correctly', () => {
    render(<Render />);
    //screen.debug(screen.getByRole('heading'));
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button')[1]).toBeInTheDocument();
    //screen.debug(screen.getByText('Udemy'));
    expect(screen.getByText('Udemy')).toBeInTheDocument();
    expect(screen.queryByText('hoge')).not.toBeInTheDocument();
    expect(screen.getByTestId('copyright')).toBeInTheDocument();
  });
});
