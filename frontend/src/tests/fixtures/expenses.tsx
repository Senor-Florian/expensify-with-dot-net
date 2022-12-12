import moment from 'moment';
import Currency from '../../enums/Currency';
import Expense from '../../interfaces/Expense';

const expenses : Expense[] = [
    {
        id: '1',
        description: 'Gum',
        note: '',
        amount: 195,
        currency : Currency.HUF,
        date: moment(0)
    },
    {
        id: '2',
        description: 'Rent',
        note: '',
        amount: 109500,
        currency : Currency.HUF,
        date: moment(0).subtract(4, 'days')
    },
    {
        id: '3',
        description: 'Credit Card',
        note: '',
        amount: 4500,
        currency : Currency.HUF,
        date: moment(0).add(4, 'days')
    }
];
export default expenses;
