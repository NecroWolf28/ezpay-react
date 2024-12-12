import React from 'react';
import Button from '../../../components/Button';
import './EditTransactionForm.css';

function EditTransactionForm({ transaction, onChange, onSubmit, onCancel }) {
    return (
        <div className="transaction-form">
            <h1 className="page-title">Edit Transaction</h1>
            <div className="edit-transaction-card">
                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={transaction.amount || ''}
                        onChange={onChange}
                        placeholder="Enter the amount"
                    />
                </label>
                <label>
                    Recipient:
                    <input
                        type="text"
                        name="recipientSender"
                        value={transaction.recipientSender || ''}
                        onChange={onChange}
                        placeholder="Enter the recipient"
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={transaction.description || ''}
                        onChange={onChange}
                        placeholder="Enter the description"
                    />
                </label>
                <label>
                    Type:
                    <input
                        type="text"
                        name="type"
                        value={transaction.type || ''}
                        onChange={onChange}
                        placeholder="Enter the transaction type"
                    />
                </label>
                <div className="button-group">
                    <Button label="Submit" type="confirm" onClick={onSubmit} />
                    <Button label="Cancel" type="cancel" onClick={onCancel} />
                </div>
            </div>
        </div>
    );
}

export default EditTransactionForm;
