import { FC } from 'react';

export const Render: FC = () => {
  return (
    <div>
      <h1>React Testing Library Lesson</h1>
      <input type="text" />
      <button>Click1</button>
      <button>Click2</button>
      <p>Udemy</p>
      <span data-testid="copyright">@React</span>
    </div>
  );
};
