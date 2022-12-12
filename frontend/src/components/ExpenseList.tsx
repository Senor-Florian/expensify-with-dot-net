import React from 'react';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
import { useAppSelector } from "../hooks/hooks";
import Expense from '../interfaces/Expense';

const ExpenseList = () => {
    const filteredExpenses = useAppSelector(state => selectExpenses(state.expenses, state.filters));

    return (
        <div className="content-container">
            <div className="list-header">
                <div className="show-for-mobile">Expenses</div>
                <div className="show-for-desktop">Expense</div>
                <div className="show-for-desktop">Amount</div>
            </div>
            <div className="list-body">
                {
                    filteredExpenses.length === 0 ? (
                        <div className="list-item list-item--message">
                            <span>No expenses</span>
                        </div>
                    ) : (
                        filteredExpenses.map((expense: Expense) => {
                            return <ExpenseListItem key={expense.id} {...expense} />
                        })
                    )
                }
            </div>
        </div>
    )
};

export default ExpenseList;