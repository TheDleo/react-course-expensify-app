import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startAddExpense,
    addExpense,
    editExpense,
    startEditExpense,
    removeExpense,
    startRemoveExpense,
    setExpenses,
    startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'mytestuseruniqueid';
const defaultAuthState = { auth: { uid } };

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, createdAt, amount }) => {
        expensesData[id] = { description, note, createdAt, amount };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup removeExpense action object', () => {
    const action = removeExpense( { id: '123abc' } );
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe('REMOVE_EXPENSE');
        expect(actions[0].id).toBe(id);
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value')

    }).then((snapshot) => {
        expect(snapshot.val()).toBe(null);
        done();
    })
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

test('should edit expense in firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    const updates = {
        description: 'Testing startEditExpense',
        amount: 10000000,
        note: 'this is my new test note',
        createdAt: -10000
    }

    store.dispatch(startEditExpense( id, updates )).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(updates);
        done();
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

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'My note',
        createdAt: 102022882828
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    }).catch((e) => {
        console.log('error', e);
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        amount: 0,
        createdAt: 0,
        description: '',
        note: '' 
    };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
    
});

test('should set up setExpenses action correctly', () => {
    const result = setExpenses(expenses);
    expect(result.type).toBe('SET_EXPENSES');
    expect(result.expenses.length).toBe(3);
    expect (result.expenses).toEqual(expenses);
    expect(result).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then((snapshot) => {
        const actions = store.getActions();
        expect(actions[0].type).toBe('SET_EXPENSES');
        expect(actions[0].expenses.length).toBe(3);
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    }).catch((e) => {
        console.log(e);
        done();
    });
});