import React from "react";
import { useExpenses, useDeleteExpense } from "../app/useexpenses/useExpenses";
import ExpenseHistory from "../components/ExpenseHistory";

const PageManageExpenses: React.FC = () => {
  const { data: expenseData = [], isLoading, isError } = useExpenses();
  const deleteExpenseMutation = useDeleteExpense();

  const handleDelete = (id: string) => {
    deleteExpenseMutation.mutate(id);
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading expenses…</p>;
  }
  if (isError) {
    return <p className="text-center py-10 text-red-500">Failed to load expenses.</p>;
  }

  return (<ExpenseHistory expenseData={expenseData} onDelete={handleDelete} />);};

export default PageManageExpenses;