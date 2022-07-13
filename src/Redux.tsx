import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';

import {
  selectCount,
  increment,
  decrement,
  incrementByAmount,
} from './features/customCounter/customCounterSlice';

export const Redux: FC = () => {
  const [number, setNumber] = useState(0);
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h3>Redux Integration Test</h3>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <span data-testid="count-value">{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(incrementByAmount(number | 0))}>
          Increment by Amount
        </button>
        <input
          type="text"
          placeholder="Enter"
          value={number}
          onChange={(e) => setNumber(Number.parseInt(e.target.value))}
        ></input>
      </div>
    </div>
  );
};
