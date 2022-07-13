import { FC } from 'react';

export type FrameWorkItemType = {
  id: number;
  item: string;
};

type Props = {
  frameworks?: FrameWorkItemType[];
};

export const FrameworkList: FC<Props> = ({ frameworks }) => {
  if (!frameworks || frameworks.length === 0) {
    return <h1>No data !</h1>;
  }
  return (
    <div>
      <ul>
        {frameworks.map((framework) => (
          <li key={framework.id}>{framework.item}</li>
        ))}
      </ul>
    </div>
  );
};
