import reducer, {
  CustomCounterState,
  fetchDummy,
} from './features/customCounter/customCounterSlice';

describe('extraReducers', () => {
  const initialState: CustomCounterState = {
    mode: 0,
    value: 1,
    username: '',
  };
  it('Should output 100 + payload when fullfiled', () => {
    const action = { type: fetchDummy.fulfilled.type, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toBe(105);
  });
  it('Should output 100 - payload when rejected', () => {
    const action = { type: fetchDummy.rejected.type, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toBe(95);
  });
});
