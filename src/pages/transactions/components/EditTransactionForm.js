import React from 'react';
import Button from '../../../components/Button';
import './EditTransactionForm.css';
import Card from "../../../components/Card";

function EditTransactionForm({transaction, onChange, onSubmit, onCancel}) {
    return (
        <div className="transaction-form">
            <h1 className="page-title">Edit Transaction</h1>
            <Card>
                <label>Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={transaction.amount || ''}
                    onChange={onChange}
                    placeholder="Enter the amount"
                />
                <label>Recipient:</label>
                <input
                    type="text"
                    name="recipientSender"
                    value={transaction.recipientSender || ''}
                    onChange={onChange}
                    placeholder="Enter the recipient"
                />
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={transaction.description || ''}
                    onChange={onChange}
                    placeholder="Enter the description"
                />
                <label>Type:</label>
                <input
                    type="text"
                    name="type"
                    value={transaction.type || ''}
                    onChange={onChange}
                    placeholder="Enter the transaction type"
                />
                <div className="buttons">
                    <Button label="Submit" type="confirm" onClick={onSubmit}/>
                    <Button label="Cancel" type="cancel" onClick={onCancel}/>
                </div>
            </Card>
        </div>
    );
}

export default EditTransactionForm;
