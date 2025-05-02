import React from "react";
import ExpenseForm from "../components/ExpenseForm";
import { useAddExpense } from "../app/useexpenses/useExpenses";
import { Expense } from "../types/expense";

const PageCreateExpenses: React.FC = () => {
  const addExpenseMutation = useAddExpense();

  const handleAdd = (expense: Expense) => {
    addExpenseMutation.mutate(expense);
  };

  return (<ExpenseForm onExpenseData={handleAdd} />);};

export default PageCreateExpenses;