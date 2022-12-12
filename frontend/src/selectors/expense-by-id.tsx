import Expense from '../interfaces/Expense';

export default (expenses: Expense[], id: string) => {
    return expenses.find((expense: Expense) => expense.id === id) ?? null;
};