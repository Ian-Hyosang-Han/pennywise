import { useNavigate } from "react-router-dom";

interface Expense {
  id: string;
  date: string;
  item: string;
  amount: number;
  description: string;
  createdBy: string;
  userId: string;
}

interface ExpenseHistoryProps {
  expenseData: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseHistory = ({ expenseData, onDelete }: ExpenseHistoryProps) => {
  const navigate = useNavigate();

  const handleDetail = (id: string) => {
    navigate(`/detail/${id}`);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this expense?");
    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <section className="w-[80%] mx-auto p-5 bg-gray-100 rounded-lg mb-8">
      {expenseData.length === 0 ? (
        <p className="text-center text-gray-500">No expense records available.</p>
      ) : (
        <ul className="w-full mt-2">
          {expenseData.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between items-center p-4 bg-white shadow-md mb-2 rounded"
            >
              <div
                className="w-4/5 overflow-hidden cursor-pointer"
                onClick={() => handleDetail(expense.id)}
              >
                <span className="font-Mon text-xs text-gray-500 mr-2">
                  {expense.date}
                </span>
                <span className="font-Mon text-xs text-gray-500">
                  Created by: {expense.createdBy}
                </span>
                <p className="font-Raj font-bold mt-2 truncate">
                  {`${expense.item} - ${expense.description}`}
                </p>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="font-Raj font-bold mb-2 text-xl text-[#434343] whitespace-nowrap">
                  {`${expense.amount} CAD`}
                </span>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="font-btn font-bold bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ExpenseHistory;