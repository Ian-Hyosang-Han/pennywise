import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Expense } from "../types/expense";

interface ExpenseFormProps {
  initialData?: Expense;
  submitLabel?: string;
  onExpenseData: (expense: Expense) => void;
}

const categoryOptions = [
  "Beauty",
  "Books",
  "Shopping",
  "Food",
  "Snacks",
  "Travel",
  "Education",
  "Fitness",
  "Events",
  "Health",
  "Medical",
  "Entertainment",
  "Essentials",
  "Transportation",
  "Others",
];

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  initialData,
  submitLabel = "Save",
  onExpenseData,
}) => {
  const dateRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = initialData?.id || uuidv4();
    const date = dateRef.current?.value;
    const title = titleRef.current?.value;
    const item = itemRef.current?.value;
    const amount = amountRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!date || !title || !item || !amount || !description) {
      alert("Please fill in all fields.");
      return;
    }
    if (Number(amount) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }

    const expenseData: Expense = {
      id,
      date,
      title,
      item,
      amount: Number(amount),
      description,
      createdBy: user.username,
      userId: user.id,
    };

    onExpenseData(expenseData);
    e.currentTarget.reset();
  };

  return (
    <div className="mt-5 mx-5">
      <section className="card w-full bg-gray-100 rounded-lg">

        <h2 className="font-Han text-[#434343] uppercase text-3xl font-bold mb-4">
          {initialData ? "Edit Expense" : "Create Expense"}
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <fieldset className="flex flex-col">
            <label htmlFor="title" className="font-Raj text-2xl font-bold mb-2">
              Expense Title
            </label>
            <input
              id="title"
              type="text"
              defaultValue={initialData?.title}
              ref={titleRef}
              placeholder="Title"
              className="form-input w-full p-2 border rounded"
            />
          </fieldset>

          {/* Date & Category */}
          <div className="flex gap-6">
            <fieldset className="flex flex-col w-1/2">
              <label htmlFor="date" className="font-Mon font-bold mb-2">
                Date
              </label>
              <input
                id="date"
                type="date"
                defaultValue={initialData?.date}
                ref={dateRef}
                className="form-input p-2 border rounded"
              />
            </fieldset>

            <fieldset className="flex flex-col w-1/2">
              <label htmlFor="item" className="font-Mon font-bold mb-2">
                Category
              </label>
              <select
                id="item"
                defaultValue={initialData?.item || ""}
                ref={itemRef}
                className="form-input p-2 border rounded"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>

          {/* Amount */}
          <fieldset className="flex flex-col">
            <label htmlFor="amount" className="font-Mon font-bold mb-2">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              defaultValue={initialData?.amount}
              ref={amountRef}
              placeholder="Expense amount"
              className="form-input p-2 border rounded w-full"
            />
          </fieldset>

          {/* Description */}
          <fieldset className="flex flex-col">
            <label htmlFor="description" className="font-Mon font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              defaultValue={initialData?.description}
              ref={descriptionRef}
              placeholder="Details of the expense"
              className="form-input p-2 border rounded h-24"
            />
          </fieldset>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="font-btn font-bold cursor-pointer bg-[#6BC1B4] hover:bg-[#5CAEA2] text-white px-6 py-2 rounded transition"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ExpenseForm;