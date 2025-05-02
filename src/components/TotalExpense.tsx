import { useExpenses } from "../app/useexpenses/useExpenses";
import { Expense } from "../types/expense";

interface TotalExpenseProps {
  selectedMonth: number;
}

const TotalExpense = ({ selectedMonth }: TotalExpenseProps) => {
  const { data: expenseData = [] } = useExpenses();
  const currentYear = new Date().getFullYear();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const selectedMonthName = monthNames[selectedMonth - 1] || "";

  // Calculate for Yearly
  const totalYearlyExpense = expenseData.reduce(
    (acc: number, item: Expense) => {
      const [year] = item.date.split("-").map(Number);
      return year === currentYear ? acc + item.amount : acc;
    },
    0
  );

  // Calculate for Monthly
  const totalMonthlyExpense = expenseData.reduce(
    (acc: number, item: Expense) => {
      const [, month] = item.date.split("-").map(Number);
      return month === selectedMonth ? acc + item.amount : acc;
    },
    0
  );

  return (
    <div className="space-y-5">
      <section className="card w-full bg-gray-100 mt-5 p-5 rounded-lg">
        {/* Monthly */}
        <div className="flex justify-between items-center font-Mon text-xl font-bold text-[#434343]">
          <span>Total expenses for {selectedMonthName}:</span>
          <span>
            {totalMonthlyExpense.toLocaleString("en-CA", {
              style: "currency",
              currency: "CAD",
            })}
          </span>
        </div>

        {/* Yearly */}
        <div className="flex justify-between items-center font-Mon text-xl font-bold text-[#434343] mt-4">
          <span>Total expenses for {currentYear}:</span>
          <span>
            {totalYearlyExpense.toLocaleString("en-CA", {
              style: "currency",
              currency: "CAD",
            })}
          </span>
        </div>
      </section>
    </div>
  );
};

export default TotalExpense;