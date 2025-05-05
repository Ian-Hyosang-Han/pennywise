import api from './axios';
import { Expense } from '../types/expense';

// Fetch all expenses
export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await api.get<Expense[]>('/expenses?_sort=date&_order=desc');
  return response.data;
};

// Add a new expense
export const addExpense = async (expense: Expense): Promise<Expense> => {
  const response = await api.post<Expense>('/expenses', expense);
  return response.data;
};

// Update an existing expense
export const updateExpense = async (expense: Expense): Promise<Expense> => {
  const { id, ...updatedFields } = expense;
  const response = await api.put<Expense>(`/expenses/${id}`, updatedFields);
  return response.data;
};

// Delete an expense
export const deleteExpense = async (id: string): Promise<void> => {
  await api.delete(`/expenses/${id}`);
};