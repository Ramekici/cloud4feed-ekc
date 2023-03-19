import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/counter/counterSlice';
import authReducer from '../features/counter/authSlice';
import todosReducer from '../features/counter/todosSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    todos: todosReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
