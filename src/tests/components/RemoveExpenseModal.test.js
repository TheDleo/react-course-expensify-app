import React from 'react';
import { shallow } from "enzyme";
import RemoveExpenseModal from "../../components/RemoveExpenseModal";
import expenses from '../fixtures/expenses';

let modalIsOpen, onRemove, handleCloseModal, selectedExpense, wrapper;

beforeEach(() => {
    modalIsOpen = true;
    onRemove = jest.fn();
    handleCloseModal = jest.fn();
    selectedExpense = expenses[1];
    wrapper = shallow(
    <RemoveExpenseModal 
        modalIsOpen={modalIsOpen}
        onRemove={onRemove}
        handleCloseModal={handleCloseModal}
        selectedExpense={selectedExpense}
    />);
});

test('should render RemoveExpenseModal', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should remove expense when remove button clicked', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(onRemove).toHaveBeenCalled();
});

test('should cancel removal when cancel button clicked', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(handleCloseModal).toHaveBeenCalled();
});

test('should render expense name correctly', () => {
    expect(wrapper.find('p .modal__body').text()).toBe(selectedExpense.description);
});