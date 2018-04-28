import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
    const expensesWord = expensesCount === 1 ? 'expense' : 'expenses';
    const formattedTotal = numeral(expensesTotal / 100).format('$0,0.00');
    return (
    <div>
        <h1>Viewing {expensesCount} {expensesWord} totalling {formattedTotal}</h1>
    </div>
    )
};

const mapStateToProps = (state) => {
    const selectedExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expensesCount: selectedExpenses.length,
        expensesTotal: selectExpensesTotal(selectedExpenses)
    }
};

export default connect(mapStateToProps)(ExpensesSummary);