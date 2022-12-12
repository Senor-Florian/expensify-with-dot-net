import moment from "moment";

export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

export const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

export const setStartDate = (startDate: moment.Moment | null) => ({
    type: 'SET_START_DATE',
    startDate
});

export const setEndDate = (endDate: moment.Moment | null) => ({
    type: 'SET_END_DATE',
    endDate
});
