import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Expense } from "../types/expense";

interface ExpenseFormProps {
  onExpenseData: (expense: Expense) => void;
}

const categoryOptions = [
  "Beauty", "Books", "Shopping", "Food", "Snacks",
  "Travel", "Education", "Fitness", "Events", "Health",
  "Medical", "Entertainment", "Essentials", "Transportation", "Others"
];

const ExpenseForm = ({ onExpenseData }: ExpenseFormProps) => {
  const dateRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = uuidv4();
    const date = dateRef.current?.value;
    const item = itemRef.current?.value;
    const amount = amountRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!date || !item || !amount || !description) {
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
    <section className="w-full max-w-[80%] mx-auto p-5 bg-gray-100 rounded-lg mt-5 mb-5">
      <form
        className="flex flex-wrap gap-4 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <fieldset className="flex flex-col min-w-[180px]">
          <label className="font-Mon mb-2 font-bold" htmlFor="date">
            Date
          </label>
          <input
            className="w-[180px] p-1 border-2 rounded-md border-[#757575] bg-white"
            type="date"
            id="date"
            placeholder="YYYY-MM-DD"
            ref={dateRef}
          />
        </fieldset>

        <fieldset className="flex flex-col min-w-[180px]">
          <label className="font-Mon mb-2 font-bold" htmlFor="item">
            Category
          </label>
          <select
            className="w-[180px] p-1 border-2 rounded-md border-[#757575] bg-white"
            id="item"
            ref={itemRef}
            defaultValue=""
          >
            <option value="" disabled>Select category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="flex flex-col min-w-[150px]">
          <label className="font-Mon mb-2 font-bold" htmlFor="amount">
            Amount
          </label>
          <input
            className="w-[180px] p-1 border-2 rounded-md border-[#757575] bg-white"
            type="number"
            id="amount"
            placeholder="Expense amount"
            ref={amountRef}
          />
        </fieldset>

        <fieldset className="flex flex-col min-w-[150px]">
          <label className="font-Mon mb-2 font-bold" htmlFor="description">
            Description
          </label>
          <input
            className="w-[180px] p-1 border-2 rounded-md border-[#757575] bg-white"
            type="text"
            id="description"
            placeholder="Details of the expense"
            ref={descriptionRef}
          />
        </fieldset>

        <button
          className="font-btn font-bold w-[120px] tracking-[5px] mt-7.5 h-9 text-xl text-white px-1 py-1 bg-[#6BC1B4] hover:bg-[#5CAEA2] transition-colors duration-200 block rounded-md cursor-pointer"
          type="submit"
        >
          SAVE
        </button>
      </form>
    </section>
  );
};

export default ExpenseForm;