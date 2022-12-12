import React from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useState } from 'react';

const ExpenseListFilters = () => {
    const [calendarFocused, setCalendarFocused] = useState<FocusedInputShape | null>(null);
    const dispatch = useAppDispatch();
    const filters = useAppSelector(state => state.filters);

    return (
        <div className="content-container">
            <div className="input-group">
                <div className="input-group__item">
                    <input className="text-input" type="text" placeholder="Search expenses" value={filters.text} onChange={(e) => dispatch(setTextFilter(e.currentTarget.value))} />
                </div>
                <div className="input-group__item">
                    <select className="select" value={filters.sortBy} onChange={(e) => {
                        if (e.currentTarget.value === 'date')
                            dispatch(sortByDate());
                        else if (e.currentTarget.value === 'amount')
                            dispatch(sortByAmount());
                    }} >
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                    </select>
                </div>
                <div className="input-group__item">
                    <DateRangePicker
                        startDateId="WhyIsThisRequired"
                        endDateId="WhyIsThisRequired"
                        startDate={filters.startDate}
                        endDate={filters.endDate}
                        onDatesChange={(e) => {
                            dispatch(setStartDate(e.startDate));
                            dispatch(setEndDate(e.endDate));
                        }}
                        focusedInput={calendarFocused}
                        onFocusChange={focus => setCalendarFocused(focus)}
                        showClearDates={true}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                </div>
            </div>
        </div>
    )
}

export default ExpenseListFilters;