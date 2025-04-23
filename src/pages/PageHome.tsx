import ExpenseForm from "../components/ExpenseForm";
import { useExpenses, useAddExpense } from "../app/useexpenses/useExpenses";

// 타입은 함수 밖에서 정의하는 것이 안전
interface Expense {
  id: string;
  date: string;
  item: string;
  amount: number;
  description: string;
  createdBy: string;
  userId: string;
}

const PageHome = () => {
  
  // const { data: expenseData = [] } = useExpenses();
  const addExpenseMutation = useAddExpense();

  const onExpenseData = (data: Expense) => {
    addExpenseMutation.mutate(data);
  };

  return (
    <section className="page-home">
      <ExpenseForm onExpenseData={onExpenseData} />
      <div className="home-content">
        <p>
          This is your dashboard. You can start by adding your first expense 💸
        </p>
      </div>
    </section>
  );
};

export default PageHome;
