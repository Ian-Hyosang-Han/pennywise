import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../../types/expense';

interface ExpenseState {
  items: Expense[];
}

const initialState: ExpenseState = {
  items: [],
};

const expenseDataSlice = createSlice({
  name: 'expenseData',
  initialState,
  reducers: {
    setExpenseData(state, action: PayloadAction<Expense[]>) {
      state.items = action.payload;
    },
    addExpenseData(state, action: PayloadAction<Expense>) {
      state.items.push(action.payload);
    },
    deleteExpenseData(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateExpenseData(
      state,
      action: PayloadAction<{ id: string; updatedData: Partial<Expense> }>
    ) {
      const { id, updatedData } = action.payload;
      const idx = state.items.findIndex(item => item.id === id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...updatedData };
      }
    },
  },
});

export const {
  setExpenseData,
  addExpenseData,
  deleteExpenseData,
  updateExpenseData,
} = expenseDataSlice.actions;

export default expenseDataSlice.reducer;