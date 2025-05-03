import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { Expense } from "../types/expense";

interface ExpenseHistoryProps {
  expenseData: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseHistory = ({ expenseData, onDelete }: ExpenseHistoryProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Navigate to the detail page when 'Edit' is clicked
  const handleEditClick = (id: string) => {
    navigate(`/detailexpense/${id}`);
  };

  // Open modal on 'Delete' click
  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  // Clicking 'Confirm' in the modal triggers the actual delete action
  const handleConfirmDelete = () => {
    if (selectedId) {
      onDelete(selectedId);
      setSelectedId(null);
    }
    setIsModalOpen(false);
  };

  // On 'Cancel' click → close the modal
  const handleCancelDelete = () => {
    setSelectedId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="mt-5 mb-5 mx-5">
      <section className="card w-full">
        <h2 className="font-Han text-[#434343] uppercase text-3xl font-bold mb-4">Manage Expenses</h2>

        {expenseData.length === 0 ? (
          <p className="text-center text-gray-500">
            No expense records available.
          </p>
        ) : (
          <ul className="w-full space-y-2">
            {expenseData.map((expense) => (
              <li
                key={expense.id}
                className="flex justify-between items-start mb-5 p-4 bg-gray-50 shadow-md rounded"
              >
                <div className="w-4/5">
                  <h4 className="font-Mon text-lg mb-1">{expense.title}</h4>
                  <div className="flex gap-2 text-xs text-gray-500 mb-1">
                    <span>{expense.date}</span>
                    <span>Created by: {expense.createdBy}</span>
                  </div>
                  <p className="font-Raj font-bold truncate">
                    {`${expense.item} — ${expense.description}`}
                  </p>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <span className="font-Raj font-bold text-xl text-[#434343]">
                    {expense.amount.toLocaleString("en-CA", {
                      style: "currency",
                      currency: "CAD",
                    })}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(expense.id)}
                      className="font-btn font-bold bg-blue-400 hover:bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(expense.id)}
                      className="font-btn font-bold bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Delete Confirmation Modal */}
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