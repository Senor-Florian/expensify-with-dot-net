import filtersReducer from '../../reducers/filters';
import moment from 'moment';
import Filter from '../../interfaces/Filter';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
    });
});

test('should set sort by to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('should set sort by to date', () => {
    const currentState : Filter = {
        text: '',
        sortBy: 'amount',
        startDate: moment(),
        endDate: moment()
    };
    var action = { type: 'SORT_BY_DATE'}
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});


test('should set text filter', () => {
    const textFilter = 'some words'
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: textFilter});
    expect(state.text).toBe(textFilter);
});


test('should set start date filter', () => {
    const startDateFilter = moment(0).add(1, 'days');
    const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: startDateFilter});
    expect(state.startDate).toEqual(startDateFilter);
});

test('should set end date filter', () => {
    const endDateFilter = moment(0).add(6, 'days');
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate: endDateFilter});
    expect(state.endDate).toEqual(endDateFilter);
});