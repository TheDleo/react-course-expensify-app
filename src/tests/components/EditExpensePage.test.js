import React from 'react';
import { shallow } from "enzyme";
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from "../fixtures/expenses";

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage 
            startEditExpense={startEditExpense}
            startRemoveExpense={startRemoveExpense}
            history={history}
            expense={expenses[0]}
        />);
});

test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle edit expense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id,expenses[0]);
});

test('should open remove expense modal on click', () => {
    expect(wrapper.find('RemoveExpenseModal').prop('modalIsOpen')).toBe(false);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('RemoveExpenseModal').prop('modalIsOpen')).toBe(true);
});
