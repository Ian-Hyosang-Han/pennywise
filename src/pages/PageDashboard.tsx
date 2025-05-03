import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getTodayDate } from "../utilities/getDates";
import quotes from "../utilities/quotes";

import MonthlyExpense from "../components/MonthlyExpense";
import ExpenseGraph from "../components/ExpenseGraph";
import TotalExpense from "../components/TotalExpense";

const PageDashboard: React.FC = () => {
  const username = useSelector((state: RootState) => state.user.userInfo?.username);
  const today = getTodayDate();

  const [selectedMonth, setSelectedMonth] = useState<number>(() => {
    const saved = localStorage.getItem("selectedMonth");
    return saved ? parseInt(saved, 10) : new Date().getMonth() + 1;
  });
  const handleChangeMonth = (month: number) => {
    setSelectedMonth(month);
    localStorage.setItem("selectedMonth", month.toString());
  };

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <section className="ml-5 mr-5">

      {/* Greeting and today's date */}
      <div className="my-5 flex gap-5">
        <div className="card flex-none basis-[30%]">
          <h2 className="font-Han text-xl md:text-2xl">Hello, {username} 👋</h2>
          <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">{today}</p>
        </div>

        {/* Quote */}
        <div className="card flex-1">
          <h3 className="font-Raj font-bold text-xl md:text-[20px]">
            Quote of the Day
          </h3>
          <blockquote className="font-bold italic text-[#434343]">
            "{randomQuote.quote}"
            <footer className="text-right text-sm text-gray-500">
              — {randomQuote.author}
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Select month, display graph, and show total amount */}
      <MonthlyExpense selectedMonth={selectedMonth} onChangeMonth={handleChangeMonth} />
      <ExpenseGraph selectedMonth={selectedMonth} />
      <TotalExpense selectedMonth={selectedMonth} />
    </section>
  );
};

export default PageDashboard;