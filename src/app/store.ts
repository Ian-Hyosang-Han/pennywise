import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import expenseDataReducer from './expense/expenseDataSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    expenseData: expenseDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;