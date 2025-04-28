import { useEffect, useState } from "react";
import icons from "../assets/graph/icons";
import SkeletonBar from "../assets/styles/SkeletonBar";
import SkeletonCircle from "../assets/styles/SkeletonCircle";
import { useExpenses } from "../app/useexpenses/useExpenses";
import { Expense } from "../types/expense";

const COLORS = [
  "#93CDE9",
  "#1BC9A6",
  "#5D6DBE",
  "#F15B87",
  "#F56971",
  "#E4CB6D",
  "#fc8969",
  "#E8738F",
  "#FF4560",
  "#A4DDED",
  "#FFB347",
  "#B39EB5",
  "#fa635b",
  "#ffd1dc",
];

const ExpenseGraph = ({ selectedMonth }: { selectedMonth: number }) => {
  const { data: expenses = [], isLoading } = useExpenses();
  const [animationReady, setAnimationReady] = useState(false);

  const filteredExpenses = expenses.filter((e: Expense) => {
    const [year, month] = e.date.split('-').map(Number);
    return month === selectedMonth;
  });

  const categorySum: Record<string, number> = filteredExpenses.reduce(
    (acc: Record<string, number>, curr: Expense) => {
      if (!acc[curr.item]) acc[curr.item] = 0;
      acc[curr.item] += Number(curr.amount);
      return acc;
    },
    {}
  );

  const sortedData: [string, number][] = Object.entries(categorySum).sort(
    ([, a], [, b]) => b - a
  );
  const totalAmount = sortedData.reduce(
    (acc: number, [, amt]) => acc + Number(amt),
    0
  );

  useEffect(() => {
    setAnimationReady(false);
    const timer = setTimeout(() => setAnimationReady(true), 300);
    return () => clearTimeout(timer);
  }, [selectedMonth]);

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-100 rounded-xl">
        {[...Array(4)].map((_, i) => (
          <div className="flex items-center gap-4 mb-3" key={i}>
            <SkeletonCircle />
            <SkeletonBar />
          </div>
        ))}
      </div>
    );
  }

  if (sortedData.length === 0) {
    return (
      <p className="text-center text-gray-400 py-10">
        No expense data for this month.
      </p>
    );
  }

  return (
    <div className="flex justify-center items-center mt-5">
      <div className="w-[80%] p-4 bg-gray-100 rounded-lg">
        {sortedData.map(([item, amount], index) => {
          const color = COLORS[index % COLORS.length];
          const Icon = icons[item as keyof typeof icons] || icons["Others"];
          const widthPercent = animationReady
            ? (amount / totalAmount) * 100
            : 0;

          return (
            <div className="flex items-center justify-between mb-4" key={item}>
              <div className="flex items-center gap-2 w-1/3">
                <div
                  className="w-10 h-10 flex justify-center items-center rounded-full"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="text-white w-5 h-5" />
                </div>
                <p className="font-bold">{item}</p>
              </div>
              <div className="flex-1 mx-3 h-6 bg-gray-300 rounded overflow-hidden">
                <div
                  className="h-full transition-all duration-1000 ease-in-out"
                  style={{ backgroundColor: color, width: `${widthPercent}%` }}
                />
              </div>
              <p className="w-20 text-right font-semibold">
                {amount.toLocaleString("en-CA", {
                  style: "currency",
                  currency: "CAD",
                })}
              </p>{" "}
            </div>
          );
        })}

        <div className="flex justify-end mt-4 pr-2">
          <p className="text-right text-lg font-semibold text-[#434343]">
            Total:{" "}
            {totalAmount.toLocaleString("en-CA", {
              style: "currency",
              currency: "CAD",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseGraph;
