import Currency from '../enums/Currency';
import Expense from '../interfaces/Expense';

export default (expenses: Expense[]) => {
    let groupedExpenses: Record<Currency, number> = {
        EUR: 0,
        GBP: 0,
        HUF: 0,
        USD: 0
    };
    expenses.forEach((expense) => {
        if (groupedExpenses[expense.currency]) {
            groupedExpenses[expense.currency] += expense.amount;
        } else {
            groupedExpenses[expense.currency] = expense.amount;
        }
    });

    return groupedExpenses;
};