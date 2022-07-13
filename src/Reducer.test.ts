import reducer, {
  CustomCounterState,
  increment,
  incrementByAmount,
} from './features/customCounter/customCounterSlice';

describe('Reducer of ReduxToolKit', () => {
  describe('increment action', () => {
    const initialState: CustomCounterState = {
      mode: 0,
      value: 1,
      username: '',
    };
    it('Should increment by 1 with mode 0', () => {
      const state = reducer(initialState, increment());
      expect(state.value).toBe(2);
    });
    it('Should increment by 100 with mode 1', () => {
      const state = reducer({ ...initialState, mode: 1 }, increment());
      expect(state.value).toBe(101);
    });
    it('Should increment by 10000 with mode 2', () => {
      const state = reducer({ ...initialState, mode: 2 }, increment());
      expect(state.value).toBe(10001);
    });
  });
  describe('increment By Amount action', () => {
    const initialState: CustomCounterState = {
      mode: 0,
      value: 1,
      username: '',
    };
    it('Should increment by amount param with mode 0', () => {
      const state = reducer(initialState, incrementByAmount(2));
      expect(state.value).toBe(3);
    });
    it('Should increment by 100 * amount with mode 1', () => {
      const state = reducer({ ...initialState, mode: 1 }, incrementByAmount(2));
      expect(state.value).toBe(201);
    });
    it('Should increment by 10000 * amount with mode 2', () => {
      const state = reducer({ ...initialState, mode: 2 }, incrementByAmount(2));
      expect(state.value).toBe(20001);
    });
  });
});
