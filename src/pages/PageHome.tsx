import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseHistory from "../components/ExpenseHistory";
import MonthlyExpense from "../components/MonthlyExpense";
import {
  useExpenses,
  useAddExpense,
  useDeleteExpense,
} from "../app/useexpenses/useExpenses";
import ExpenseGraph from "../components/ExpenseGraph";
import { Expense } from "../types/expense";
import YearlyExpense from "../components/YearlyExpense";

const PageHome = () => {
  const { data: expenseData = [] } = useExpenses();
  const addExpenseMutation = useAddExpense();
  const deleteExpenseMutation = useDeleteExpense();

  const onExpenseData = (data: Expense) => {
    addExpenseMutation.mutate(data);
  };

  const handleDelete = (id: string) => {
    deleteExpenseMutation.mutate(id);
  };

  // Use number type internally for month
  const [selectedMonth, setSelectedMonth] = useState<number>(() => {
    const saved = localStorage.getItem("selectedMonth");
    return saved ? parseInt(saved) : new Date().getMonth() + 1;
  });

  // Pass a number to MonthlyExpense (it expects a number)
  const handleChangeMonth = (monthNum: number) => {
    setSelectedMonth(monthNum);
    localStorage.setItem("selectedMonth", monthNum.toString());
  };

  // Filter expenses by selected month, with valid date check
  const filteredExpenseData = expenseData.filter((item: Expense) => {
    const [year, month] = item.date.split('-').map(Number);
    return month === selectedMonth;
  });

  return (
    <section className="page-home">
      <YearlyExpense />
      <MonthlyExpense selectedMonth={selectedMonth} onChangeMonth={handleChangeMonth} />
      <ExpenseGraph selectedMonth={selectedMonth} />
      <ExpenseForm onExpenseData={onExpenseData} />
      <ExpenseHistory expenseData={filteredExpenseData} onDelete={handleDelete} />
    </section>
  );
};

export default PageHome;