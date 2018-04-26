import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//Expenses
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            // or you could use: return state.concat(state, action.expens);
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(( {id} ) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
            });
        default:
            return state;
    }
};

//Filters
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date', //amount or date
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

//Action Generators
const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ( {id} = {} ) => {
    return {
    type: 'REMOVE_EXPENSE',
    id
}};

const editExpense = ( id, updates ) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = (startDate) => ({
        type: 'SET_START_DATE',
        startDate
});

const setEndDate = (endDate) => ({
        type: 'SET_END_DATE',
        endDate
});

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        console.log(startDateMatch);
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;   
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

//Store
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log('visibleExpenses: ', visibleExpenses);
    //console.log(store.getState());
});

const expenseOne = store.dispatch(addExpense({ description: 'April Mortgage', amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Groceries', amount: 300, createdAt: -1000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id}));
// store.dispatch(editExpense( expenseTwo.expense.id, { amount: 500, note: 'I guess I will add a note.'}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

//  store.dispatch(setTextFilter('cer'));
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(-2000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));


const demoState = {
    expenses: [{
        id: 'dfafffdidihd',
        description: 'mortgage for April',
        note: 'Just another payment',
        amount: 131900,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //amount or date
        startDate: undefined,
        endDate: undefined
    }
};