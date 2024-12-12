import React from 'react';
import Button from '../lib/Button';
import './Edit.css';
import Card from "../lib/Card";

function Edit({transaction, onChange, onSubmit, onCancel}) {
    return (
        <div className="transaction-form">
            <h1 className="page-title">Edit Transaction</h1>
            <Card>
                <label className="text">Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={transaction.amount || ''}
                    onChange={onChange}
                    placeholder="Enter the amount"
                    className="input"
                />
                <label className="text">Recipient:</label>
                <input
                    type="text"
                    name="recipientSender"
                    value={transaction.recipientSender || ''}
                    onChange={onChange}
                    placeholder="Enter the recipient"
                    className="input"
                />
                <label className="text">Description:</label>
                <input
                    type="text"
                    name="description"
                    value={transaction.description || ''}
                    onChange={onChange}
                    placeholder="Enter the description"
                    className="input"
                />
                <label className="text">Type:</label>
                <input
                    type="text"
                    name="type"
                    value={transaction.type || ''}
                    onChange={onChange}
                    placeholder="Enter the transaction type"
                    className="input"
                />
                <div className="buttons">
                    <Button label="Submit" type="confirm" onClick={onSubmit}/>
                    <Button label="Cancel" type="cancel" onClick={onCancel}/>
                </div>
            </Card>
        </div>
    );
}

export default Edit;
