import React from "react";
import { Link } from "react-router-dom";
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import { useAppSelector } from "../hooks/hooks";

const ExpensesSummary = () => {
    const filteredExpenses = useAppSelector(state => selectExpenses(state.expenses, state.filters));
    const filteredExpensesTotal = selectExpensesTotal(filteredExpenses);

    // todo this is really bad
    let summedExpenses = "";
    for (const key in filteredExpensesTotal) {
        if (filteredExpensesTotal[key] != 0) {
            summedExpenses += `${filteredExpensesTotal[key]} ${key} `
        } 
    }
    if (summedExpenses === "") {
        summedExpenses = "0"
    }

    const expenseWord = filteredExpenses.length === 1 ? 'expense' : 'expenses';
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{filteredExpenses.length}</span> {expenseWord} totalling <span>{summedExpenses}</span></h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
};
export default ExpensesSummary;