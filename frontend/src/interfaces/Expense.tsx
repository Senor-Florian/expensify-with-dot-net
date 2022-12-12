import moment from "moment";
import Currency from "../enums/Currency";

interface Expense {
    id: string | null,
    amount: number,
    currency: Currency,
    date: moment.Moment,
    description: string,
    note: string
}

export default Expense;