import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { AuthData } from './authSlice';
import { addTodo, fetchAuth, fetchTodo } from './counterAPI';

export interface TodosState {
  value: Array<any>;
  status: 'idle' | 'loading' | 'failed';
}



const initialState: TodosState = {
  value: [],
  status: 'idle',
};


export const fetchTodoAsync = createAsyncThunk(
  '/public/v2/users/:id/todos',
  async (id: string) => {
    const response = await fetchTodo(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const addTodoAsync = createAsyncThunk(
  '/public/v2/users/:id/todos',
  async ({id, todo} : {id: string, todo: string}) => {
    const response = await addTodo(id, todo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTodo: (state, action) => {
      state.value = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchTodoAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setTodo } = todosSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodos = (state: RootState) => state.todos.value;

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

export default todosSlice.reducer;