interface MonthlyExpenseProps {
  selectedMonth: number;
  onChangeMonth: (month: number) => void;
}

const MonthlyExpense = ({
  selectedMonth,
  onChangeMonth,
}: MonthlyExpenseProps) => {
  const monthArr: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="flex justify-center items-center">
      <section className="card w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-center">
          {monthArr.map((month, index) => {
            const monthIndex = index + 1;
            return (
              <button
                key={month}
                onClick={() => onChangeMonth(monthIndex)}
                className={`font-Han uppercase tracking-wider text-center font-semibold text-base h-[60px] px-4 flex justify-center items-center rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedMonth === monthIndex
                    ? "bg-[#91cfec] text-white"
                    : "bg-gray-200 hover:bg-[#e0e0e0] text-[#434343]"
                }`}
              >
                {month}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MonthlyExpense;
