import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from '../../actions/filters';
import moment from 'moment';

test('should generate set start date action object', () => {
    const action = setStartDate(moment(500));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(500)
    });
});

test('should generate set end date action object', () => {
    const action = setEndDate(moment(1500));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(1500)
    });
});

test('should generate set text filter action object with provided value', () => {
    const action = setTextFilter('butts');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'butts'
    });
});

test('should generate set text filter action object with default value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should generate sort by amount action object', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

test('should generate sort by date action object', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});