import { createSlice } from '@reduxjs/toolkit';

const expenseDataSlice = createSlice({
  name: 'expenseData',
  initialState: {
    items: [],
  },
  reducers: {
    setExpenseData: (state, action) => {
      state.items = action.payload;
    },
    addExpenseData: (state, action) => {
      state.items.push(action.payload);
    },
    deleteExpenseData: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateExpenseData: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updatedData };
      }
    },
  },
});

export const { setExpenseData, addExpenseData, deleteExpenseData, updateExpenseData } = expenseDataSlice.actions;
export default expenseDataSlice.reducer;


// ✅ src/app/store.ts
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
