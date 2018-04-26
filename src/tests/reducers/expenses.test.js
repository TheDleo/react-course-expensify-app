import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expenses by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([ expenses[0], expenses[2]]);
});

test('should not remove expenses by invalid id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: 4
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        id: 4,
        description: 'description',
        note: 'note',
        createdAt: 0,
        amount: 10000000000000
    }

    const action = {
        type: 'ADD_EXPENSE',
        expense
    }

    const state = expensesReducer(undefined, action);
    expect(state).toEqual([{...expense}]);
});

test('should edit an expense', () => {
    const description = 'blah';
    const updates = { description };
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates
    }
    const state = expensesReducer(expenses, action);
    expect(state[1].description).toBe(description);
});

test('should not edit expense if not found', () => {
    const description = 'blah';
    const updates = { description };
    const action = {
        type: 'EDIT_EXPENSE',
        id: 5,
        updates
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});
