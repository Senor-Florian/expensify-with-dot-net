import Expense from '../interfaces/Expense';
import expenseService from '../services/expenseService';

export const addExpense = (expense : Expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expense : Expense) => {
    return (dispatch : any, getState : any) => {
        const userId = getState().auth.uid;
        return expenseService.create(expense, userId).then((response) => {
            dispatch(addExpense(response.data));
        });
    };
};

export const removeExpense = ({ id } : { id : string}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id } : { id : string}) => {
    return (dispatch : any, getState : any) => {
        const userId = getState().auth.uid;
        return expenseService.remove(id, userId).then((_) => {
            dispatch(removeExpense({ id }));
        });
    };
};

export const editExpense = (id : string, updates : Expense) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id : string, updates : Expense) => {
    return (dispatch : any, getState : any) => {
        const userId = getState().auth.uid;
        return expenseService.update(id, updates, userId).then((_) => {
            dispatch(editExpense(id, updates));
        });
    };
};

export const setExpenses = (expenses : Expense[]) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch : any, getState : any) => {
        const userId = getState().auth.uid;
        return expenseService.list(userId).then((response) => {
            dispatch(setExpenses(response.data));
        });
        // todo catch error
   };
};
