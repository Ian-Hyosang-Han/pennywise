import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense, ExpenseState } from '../../types/expense';

const initialState: ExpenseState = {
  items: [],
};

const expenseDataSlice = createSlice({
  name: 'expenseData',
  initialState,
  reducers: {
    setExpenseData: (state, action: PayloadAction<Expense[]>) => {
      state.items = action.payload;
    },
    addExpenseData: (state, action: PayloadAction<Expense>) => {
      state.items.push(action.payload);
    },
    deleteExpenseData: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateExpenseData: (state, action: PayloadAction<{ id: string; updatedData: Partial<Expense> }>) => {
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