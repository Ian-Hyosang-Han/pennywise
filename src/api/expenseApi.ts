import api from './axios';
import { Expense } from '../types/expense';

export const fetchExpenses = async () => {
  const response = await api.get('/expenses?_sort=date&_order=desc');
  return response.data as Expense[];
};

export const addExpense = async (expense: Expense) => {
  const response = await api.post('/expenses', expense);
  return response.data as Expense;
};

export const updateExpense = async ({
  id,
  ...updatedExpense
}: { id: string } & Partial<Expense>) => {
  const response = await api.put(`/expenses/${id}`, updatedExpense);
  return response.data as Expense;
};

export const deleteExpense = async (id: string) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};