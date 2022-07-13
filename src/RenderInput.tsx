import { FC, useState } from 'react';

type Props = {
  outputConsole: (text: string) => void;
};

export const RenderInput: FC<Props> = ({ outputConsole }) => {
  const [input, setInput] = useState('');

  const outputValue = () => {
    if (input !== '') {
      outputConsole(input);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={outputValue}>Console</button>
    </div>
  );
};
