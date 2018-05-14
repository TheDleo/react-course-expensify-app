import React from 'react';
import Modal from 'react-modal';

const RemoveExpenseModal = (props) => (
    <Modal 
        isOpen={props.modalIsOpen}
        onRequestClose={props.handleCloseModal}
        contentLabel="Remove expense with id:"
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title">Remove Expense?</h3>
        {props.selectedExpense && <p className="modal__body">{props.selectedExpense.description}</p>}
        <button className="button" onClick={props.onRemove}>Remove It!</button>
        <button className="button button--modal" onClick={props.handleCloseModal}>No!</button>
    </Modal>
);

export default RemoveExpenseModal;