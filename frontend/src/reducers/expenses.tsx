import { AnyAction } from "redux";
import Expense from "../interfaces/Expense";

const expesesReducerDefaultState : Expense[] = [];

const expensesReducer = (state = expesesReducerDefaultState, action : AnyAction) : Expense[] => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                };
            });
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};

export default expensesReducer;