import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { UserType } from '../../UseEffectRender';

const sleep = (msec: number) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('timeout');
    }, msec);
  });
};

export const fetchDummy = createAsyncThunk<
  number,
  number,
  { rejectValue: number }
>('fetch/dummy', async (num: number, { rejectWithValue }) => {
  try {
    await sleep(2000);
    return num;
  } catch (e) {
    return rejectWithValue(num);
  }
});

export const fetchJSON = createAsyncThunk('fetch/api', async () => {
  const res = await axios.get<{}, { data: UserType }>(
    'https://jsonplaceholder.typicode.com/users/1'
  );
  const { username } = res.data;
  return username;
});

export interface CustomCounterState {
  mode: 0 | 1 | 2;
  value: number;
  username: string;
}

const initialState: CustomCounterState = {
  mode: 0,
  value: 0,
  username: '',
};

export const customCounterSlice = createSlice({
  name: 'customCounter',
  initialState,
  reducers: {
    increment: (state) => {
      switch (state.mode) {
        case 0:
          state.value += 1;
          break;
        case 1:
          state.value += 100;
          break;
        case 2:
          state.value += 10000;
          break;
        default:
          break;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      switch (state.mode) {
        case 0:
          state.value += action.payload;
          break;
        case 1:
          state.value += 100 * action.payload;
          break;
        case 2:
          state.value += 10000 * action.payload;
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDummy.fulfilled, (state, action) => {
      state.value = 100 + action.payload;
    });
    builder.addCase(fetchDummy.rejected, (state, action) => {
      state.value = 100 - (action.payload ?? 0);
    });
    builder.addCase(fetchJSON.fulfilled, (state, action) => {
      state.username = action.payload;
    });
    builder.addCase(fetchJSON.rejected, (state) => {
      state.username = 'anonymous';
    });
  },
});

export const { increment, decrement, incrementByAmount } =
  customCounterSlice.actions;

export const selectCount = (state: RootState) => state.customCounter.value;
export const selectUsername = (state: RootState) =>
  state.customCounter.username;

export default customCounterSlice.reducer;
