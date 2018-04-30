import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

test('should setup removeExpense action object', () => {
    const action = removeExpense( { id: '123abc' } );
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should return correct editExpense action object', () => {
    const result = editExpense('12345', { description: 'Test description' });
    expect(result).toEqual({
        type: 'EDIT_EXPENSE',
        id: '12345',
        updates: {
            description: 'Test description'
        }
    });
});

test('should setup addExpense object with given value', () => {
    const expense = expenses[1];
    const result = addExpense(expense);
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense
    });
});

test('should add expense to database and store', () => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'My note',
        createdAt: 102022882828
    };
    store.dispatch(startAddExpense(expenseData));
});

test('should add expense with defaults to database and store', () => {
    
});

// test('should setup addExpense action object with default values', () => {
//     const expectedData = {
//         description: '',
//         note: '',
//         amount: 0,
//         createdAt: 0
//     };
//     const result = addExpense();
//     expect(result).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...expectedData,
//             id: expect.any(String)
//         }
//     });
// });