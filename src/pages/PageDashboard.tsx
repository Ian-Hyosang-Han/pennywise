import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getTodayDate } from "../utilities/getDates";
import quotes from "../utilities/quotes";

import MonthlyExpense from "../components/MonthlyExpense";
import ExpenseGraph from "../components/ExpenseGraph";
import TotalExpense from "../components/TotalExpense";
import { useExpenses } from "../app/useexpenses/useExpenses";
import { Expense } from "../types/expense";

const PageDashboard: React.FC = () => {
  const { data: expenseData = [] } = useExpenses();
  const username = useSelector((state: RootState) => state.user.userInfo?.username);
  const today = getTodayDate();

  // 선택된 월 상태 관리
  const [selectedMonth, setSelectedMonth] = useState<number>(() => {
    const saved = localStorage.getItem("selectedMonth");
    return saved ? parseInt(saved, 10) : new Date().getMonth() + 1;
  });
  const handleChangeMonth = (month: number) => {
    setSelectedMonth(month);
    localStorage.setItem("selectedMonth", month.toString());
  };

  // 명언 랜덤 선택
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <section className="page-home ml-5 mr-5">
      <div className="my-5 flex gap-5">
        <div className="card flex-none basis-[30%]">
          <h2 className="font-Han text-xl md:text-2xl">Hello, {username} 👋</h2>
          <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">{today}</p>
        </div>
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

      <MonthlyExpense selectedMonth={selectedMonth} onChangeMonth={handleChangeMonth} />
      <ExpenseGraph selectedMonth={selectedMonth} />
      <TotalExpense selectedMonth={selectedMonth} />
    </section>
  );
};

export default PageDashboard;