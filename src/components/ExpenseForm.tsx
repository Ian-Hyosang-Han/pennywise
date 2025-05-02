import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Expense } from "../types/expense";

interface ExpenseFormProps {
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

const ExpenseForm = ({ onExpenseData }: ExpenseFormProps) => {
  const dateRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = uuidv4();
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
    <div className="mt-5 ml-5 mr-5">
      <section className="card w-full">
        <h2 className="font-Mon text-3xl font-bold mb-4">Create Expense</h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          {/* Title */}
          <fieldset className="flex flex-col min-w-[180px]">
            <label className="font-Raj mb-2 text-2xl font-bold" htmlFor="title">
              Expense Title
            </label>
            <input
              ref={titleRef}
              id="title"
              type="text"
              placeholder="Title"
              className="form-input"
            />
          </fieldset>

          <div className="flex flex-row gap-5 mt-10">
            {/* Day */}
            <fieldset className="flex flex-col w-full">
              <label className="font-Mon mb-2 font-bold" htmlFor="date">
                Date
              </label>
              <input
                ref={dateRef}
                id="date"
                type="date"
                className="form-input"
              />
            </fieldset>

            {/* Category */}
            <fieldset className="flex flex-col w-full">
              <label className="font-Mon mb-2 font-bold" htmlFor="item">
                Category
              </label>
              <select
                ref={itemRef}
                id="item"
                defaultValue=""
                className="form-input"
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

          <div className="flex flex-row gap-5 mt-10">
            {/* Amount */}
            <fieldset className="flex flex-col w-full">
              <label className="font-Mon mb-2 font-bold" htmlFor="amount">
                Amount
              </label>
              <input
                ref={amountRef}
                id="amount"
                type="number"
                placeholder="Expense amount"
                className="form-input"
              />
            </fieldset>
          </div>

          {/* Description */}
          <fieldset className="flex flex-col w-full mt-10">
            <label className="font-Mon mb-2 font-bold" htmlFor="description">
              Description
            </label>
            <textarea
              ref={descriptionRef}
              id="description"
              placeholder="Details of the expense"
              className="form-input h-[90px]"
            />
          </fieldset>

          {/* Save button */}
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="font-btn font-bold w-[120px] tracking-[5px] mt-7.5 h-9 text-xl text-white bg-[#6BC1B4] hover:bg-[#5CAEA2] transition-colors duration-200 rounded-md"
            >
              SAVE
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ExpenseForm;
