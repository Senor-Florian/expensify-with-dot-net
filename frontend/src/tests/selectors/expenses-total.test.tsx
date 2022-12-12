import Currency from '../../enums/Currency';
import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const response = selectExpensesTotal([]);
    const total: Record<Currency, number> = {
        EUR: 0,
        GBP: 0,
        HUF: 0,
        USD: 0
    };
    expect(response).toEqual(total);
});

test('should correctly add up a single expense', () => {
    const response = selectExpensesTotal([expenses[0]]);
    const total: Record<Currency, number> = {
        EUR: 0,
        GBP: 0,
        HUF: 195,
        USD: 0
    };
    expect(response).toEqual(total);
});

test('should correctly add up multiple expenses', () => {
    const response = selectExpensesTotal(expenses);
    const total: Record<Currency, number> = {
        EUR: 0,
        GBP: 0,
        HUF: 114195,
        USD: 0
    };
    expect(response).toEqual(total);
});