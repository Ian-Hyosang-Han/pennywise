import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Expense {
  id: string;
  date: string;
  item: string;
  amount: number;
  description: string;
  createdBy: string;
  userId: string;
}

interface ExpenseFormProps {
  onExpenseData: (expense: Expense) => void;
}

const ExpenseForm = ({ onExpenseData }: ExpenseFormProps) => {
  const dateRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = uuidv4();
    const date = dateRef.current?.value;
    const item = itemRef.current?.value;
    const amount = amountRef.current?.value;
    const description = descriptionRef.current?.value;

    // Input validation
    if (!date || !item || !amount || !description) {
      alert('Please fill in all fields.');
      return;
    }

    if (Number(amount) <= 0) {
      alert('Amount must be greater than zero.');
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
    <section>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" placeholder="YYYY-MM-DD" ref={dateRef} />
        </fieldset>
        <fieldset>
          <label htmlFor="item">Category</label>
          <input type="text" id="item" placeholder="Expense category" ref={itemRef} />
        </fieldset>
        <fieldset>
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" placeholder="Expense amount" ref={amountRef} />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" placeholder="Details of the expense" ref={descriptionRef} />
        </fieldset>
        <button type="submit">Save</button>
      </form>
    </section>
  );
};

export default ExpenseForm;