import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchAuth } from './counterAPI';

export interface AuthState {
  value: boolean;
  status: 'idle' | 'loading' | 'failed';
}

export interface AuthData {
  name: string;
  token: string;
}

const initialState: AuthState = {
  value: false,
  status: 'idle',
};


export const authAsync = createAsyncThunk(
  '/customer/login',
  async (dtm: AuthData) => {
    const response = await fetchAuth(dtm);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAuth: (state, action) => {
      state.value = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(authAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(authAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setAuth } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuth = (state: RootState) => state.auth.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default authSlice.reducer;
