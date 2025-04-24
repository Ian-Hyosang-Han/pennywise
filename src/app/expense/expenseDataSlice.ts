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