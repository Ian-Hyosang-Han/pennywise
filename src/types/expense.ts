export interface Expense {
    id: string;
    date: string;
    item: string;
    amount: number;
    description: string;
    createdBy: string;
    userId: string;
  }
  
  export interface ExpenseState {
    items: Expense[];
  }