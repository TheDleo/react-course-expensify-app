import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const testExpenses = [];
    const result = getExpensesTotal(testExpenses);
    expect(result).toBe(0);
});

test('should add up a single expense', () => {
    const expense = [expenses[0]];
    const result = getExpensesTotal(expense);
    expect(result).toBe(expense[0].amount);
});

test('should correctly add up multiple expenses', () => {
    const result = getExpensesTotal(expenses);
    expect(result).toBe(114195);
});

test('what return 0 when array is not passed in', () => {
    const result = getExpensesTotal('string');
    expect(result).toBe(0);
});