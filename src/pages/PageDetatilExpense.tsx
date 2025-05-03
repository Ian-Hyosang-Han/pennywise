import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchExpenses, updateExpense } from "../api/expenseApi";
import ExpenseForm from "../components/ExpenseForm";
import { Expense } from "../types/expense";

const PageDetailExpense = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 1) load the single expense
  const { data: all, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });
  const expense = all?.find((e) => e.id === id);

  // 2) prepare the update mutation
  const mutation = useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      navigate("/manageexpenses");
    },
  });

  if (isLoading) return <p>Loading…</p>;
  if (!expense) return <p>Expense not found.</p>;

  // 3) when the form submits, call update
  const handleUpdate = (updated: Expense) => {
    mutation.mutate(updated);
  };

  return (
    <section className="mt-5 mx-2">
      <ExpenseForm initialData={expense} submitLabel="Update" onExpenseData={handleUpdate}/>
    </section>
  );
};

export default PageDetailExpense;