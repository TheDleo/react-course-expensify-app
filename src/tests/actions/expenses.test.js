import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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
    const expectedData = {
        description: 'Test description',
        note: 'a note\n here.',
        amount: 100,
        createdAt: 1000
    };
    const result = addExpense(expectedData);
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expectedData,
            id: expect.any(String)
        }
    });
});

test('should setup addExpense object with default values', () => {
    const expectedData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };
    const result = addExpense();
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expectedData,
            id: expect.any(String)
        }
    });
});