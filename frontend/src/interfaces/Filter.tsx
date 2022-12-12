import moment from "moment";

interface Filter {
    text: string,
    sortBy: string,
    startDate: moment.Moment,
    endDate: moment.Moment,
}

// todo date fns instead of moment

export default Filter;