import { addExpense, editExpense, removeExpense, setExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import Expense from '../../interfaces/Expense';
import moment from 'moment';
import Currency from '../../enums/Currency';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});


test('should setup edit expense action object', () => {
    const expense: Expense = {
        id: '123abc',
        description: 'stuff',
        amount: 400,
        date: moment(),
        note: 'something',
        currency: Currency.HUF
    };
    const action = editExpense('123abc', expense);
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: expense
    })
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});