import { useState } from "react";
import { Expense } from "../types/expense";
import ConfirmModal from "./ConfirmModal";

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
    if (selectedId) {
      onDelete(selectedId);
      setSelectedId(null);
    }
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedId(null);
    setIsModalOpen(false);
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
              <div className="w-4/5 overflow-hidden">
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

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="Are you sure you want to delete this expense?"
      />
    </section>
  );
};

export default ExpenseHistory;