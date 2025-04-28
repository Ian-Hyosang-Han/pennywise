import { useExpenses } from "../app/useexpenses/useExpenses";
import { Expense } from "../types/expense";
import quotes from "../utilities/quotes";

const YearlyExpense = () => {
  const { data: expenseData = [] } = useExpenses();
  const currentYear = new Date().getFullYear();

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Calculate the current year expenses
  const totalYearlyExpense = expenseData.reduce(
    (acc: number, item: Expense) => {
      const [year] = item.date.split("-").map(Number);
      return year === currentYear ? acc + item.amount : acc;
    },
    0
  );

  return (
    <div className="flex justify-center items-center">
      <section className="w-[80%] bg-gray-100 mt-5 p-5 rounded-lg">
      <blockquote className="font-bold pl-4 italic text-[#434343] mb-6">
          "{randomQuote.quote}"
          <footer className="mt-2 text-right text-sm text-gray-500">— {randomQuote.author}</footer>
        </blockquote>
        <div className="flex justify-between items-center font-Mon text-xl font-bold text-[#434343]">
          <span>Total expenses for {currentYear} :</span>
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

export default YearlyExpense;
