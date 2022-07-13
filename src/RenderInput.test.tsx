import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RenderInput } from './RenderInput';

const outputConsole = (text: string) => {
  console.log(text);
};

describe('Rendering', () => {
  it('Sholud render all the elements correctlly', () => {
    render(<RenderInput outputConsole={outputConsole} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter')).toBeInTheDocument();
  });
});

describe('Input from onChange event', () => {
  it('Should update input value correctry', async () => {
    render(<RenderInput outputConsole={outputConsole} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>('Enter');
    await userEvent.type(input, 'test');
    expect(input.value).toBe('test');
  });
});

describe('Console button conditionally triggered', () => {
  it('Should not trigger output function', async () => {
    const outputConsoleMock = jest.fn();
    render(<RenderInput outputConsole={outputConsoleMock} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(outputConsoleMock).not.toHaveBeenCalled();
  });
  it('Should trigger output function', async () => {
    const outputConsoleMock = jest.fn();
    render(<RenderInput outputConsole={outputConsoleMock} />);
    const button = screen.getByRole('button');
    const input = screen.getByPlaceholderText<HTMLInputElement>('Enter');
    await userEvent.type(input, 'test');
    await userEvent.click(button);
    expect(outputConsoleMock).toHaveBeenCalledTimes(1);
    expect(outputConsoleMock).toHaveBeenCalledWith('test');
  });
});
