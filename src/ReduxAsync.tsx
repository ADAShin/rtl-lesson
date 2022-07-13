import { FC } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  selectCount,
  selectUsername,
  fetchDummy,
  fetchJSON,
} from './features/customCounter/customCounterSlice';

export const ReduxAsync: FC = () => {
  const count = useAppSelector(selectCount);
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();
  return (
    <div>
      <span data-testid="count-value">{count}</span>
      <button onClick={() => dispatch(fetchDummy(5))}>FetchDummy</button>
      {username && <h1>{username}</h1>}
      <button onClick={() => dispatch(fetchJSON())}>FetchJSON</button>
    </div>
  );
};
