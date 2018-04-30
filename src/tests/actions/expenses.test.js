import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

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