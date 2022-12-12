import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import { startRemoveExpense } from '../actions/expenses';
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import expenseById from '../selectors/expense-by-id';

const EditExpensePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams() as { id: string}

    const expense = useAppSelector(state => expenseById(state.expenses, id));

    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Edit Expense</h1>
                </div>
            </div>
            <div className="content-container">
                <ExpenseForm
                    existingExpense={expense}
                />
                <button className="button button--secondary" onClick={() => {
                    dispatch(startRemoveExpense({ id }))
                    navigate('/');
                }}
                >Remove Expense</button>
            </div>
        </div>
    );
}

export default EditExpensePage;