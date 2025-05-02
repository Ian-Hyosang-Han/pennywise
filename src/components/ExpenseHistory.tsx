import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { Expense } from "../types/expense";

interface ExpenseHistoryProps {
  expenseData: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseHistory = ({ expenseData, onDelete }: ExpenseHistoryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  const handleConfirmDelete = () => {
    if (selectedId) onDelete(selectedId);
    setIsModalOpen(false);
    setSelectedId(null);
  };
  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  return (
    <div className="mt-5 ml-5 mr-5">
      <section className="card w-full">
      <h2 className="font-Mon text-3xl font-bold mb-4">Manage Expenses</h2>
        {expenseData.length === 0 ? (
          <p className="text-center text-gray-500">
            No expense records available.
          </p>
        ) : (
          <ul className="w-full mt-2">
            {expenseData.map((expense) => (
              <li
                key={expense.id}
                className="flex justify-between items-start p-4 bg-white shadow-md mb-2 rounded"
              >
                <div className="w-4/5">
                  {/* 새 필드: 제목 */}
                  <h4 className="font-Mon text-lg mb-1">{expense.title}</h4>
                  <div className="flex gap-2 text-xs text-gray-500 mb-1">
                    <span>{expense.date}</span>
                    <span>Created by: {expense.createdBy}</span>
                  </div>
                  <p className="font-Raj font-bold truncate">
                    {`${expense.item} — ${expense.description}`}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-Raj font-bold text-xl text-[#434343] mb-2">
                    {expense.amount.toLocaleString("en-CA", {
                      style: "currency",
                      currency: "CAD",
                    })}
                  </span>
                  <button
                    onClick={() => handleDeleteClick(expense.id)}
                    className="font-btn font-bold bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* 삭제 확인 모달 */}
        <ConfirmModal
          isOpen={isModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          message="Are you sure you want to delete this expense?"
        />
      </section>
    </div>
  );
};

export default ExpenseHistory;
