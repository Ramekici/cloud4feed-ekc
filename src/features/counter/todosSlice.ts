import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { AuthData } from './authSlice';
import { addTodo, fetchAuth, fetchTodo } from './counterAPI';
import { setModal } from './counterSlice';

export interface TodosState {
  value: Array<Todos>;
  status: 'idle' | 'loading' | 'failed';
}


export interface Todos {
  due_on: string;
  id: number;
  status: string;
  title: string;
  user_id: number
}



const initialState: TodosState = {
  value: [],
  status: 'idle',
};


export const fetchTodoAsync = createAsyncThunk(
  'fetchTodoAsync',
  async (id: string) => {
    const response = await fetchTodo(id);
    return response;
  }
);

export const addTodoAsync = createAsyncThunk(
  'addTodoAsync',
  async ({ data }: { data: Todos }) => {
    const response = await addTodo(data);
   
    // The value we return becomes the `fulfilled` action payload
    return response;
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
        if (action.payload) {
          state.value = action.payload;
        }

      })
      .addCase(fetchTodoAsync.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(addTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.value = [...state.value, action.payload];
        }
      })
      .addCase(addTodoAsync.rejected, (state) => {
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
