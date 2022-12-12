import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import Expense from '../interfaces/Expense';

const ExpenseListItem = (expense: Expense) => (
    <Link className="list-item" to={`/edit/${expense.id}`}>
        <div>
            <h3 className="list-item__title">{expense.description}</h3>
            <span className="list-item__sub-title">{moment(expense.date).format('YYYY MMMM Do')}</span>
        </div>
        <h3 className="list-item__data">{expense.amount} {expense.currency}</h3>
    </Link>
);

export default ExpenseListItem;