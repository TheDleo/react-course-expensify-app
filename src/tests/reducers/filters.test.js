import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should set up default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sort by amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('should set sort by date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const state = filtersReducer(currentState, { type: 'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const filter = {
        type: 'SET_TEXT_FILTER',
        text: 'blah'
    }
    const state = filtersReducer(undefined, filter);
    expect(state.text).toBe('blah');
});

test('should set startDate filter', () => {
    const date = moment(0).add(5,'months');
    const filter = {
        type: 'SET_START_DATE',
        startDate: date
    }
    const state = filtersReducer(undefined, filter);
    expect(state.startDate).toBe(date);
});

test('should set endDate filter', () => {
    const date = moment(0).subtract(10,'years');
    const filter = {
        type: 'SET_END_DATE',
        endDate: date
    }
    const state = filtersReducer(undefined, filter);
    expect(state.endDate).toBe(date);
});
