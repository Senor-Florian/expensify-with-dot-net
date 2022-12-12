import moment from 'moment';
import Expense from '../interfaces/Expense';

export default (expenses : Expense[], { text, sortBy, startDate, endDate } : { text : string, sortBy : string, startDate : moment.Moment, endDate: moment.Moment }) => {
    return expenses.filter((expense) => {
        const dateMomment = moment(expense.date);
        return (startDate?.isSameOrBefore(dateMomment, 'day') ?? true) &&
            (endDate?.isSameOrAfter(dateMomment, 'day') ?? true) &&
            expense.description.toLowerCase().includes(text.toLowerCase());
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.date < b.date ? 1 : -1;
        }
        else {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};
