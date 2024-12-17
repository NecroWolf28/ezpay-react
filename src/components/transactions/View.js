import React from 'react';
import Button from '../lib/Button';
import './View.css';
import Card from "../lib/Card";

function View({transaction, onCancel}) {
    return (
        <div className="transaction-view">
            <h1 className="page-title">View Transaction</h1>
            <Card>
                <label className="text">ID:</label>
                <input
                    type="number"
                    name="transactionId"
                    value={transaction.transactionId || ''}
                    className="input"
                    disabled={true}
                />
                <label className="text">Account ID:</label>
                <input
                    type="number"
                    name="accountId"
                    value={transaction.account.id || ''}
                    className="input"
                    disabled={true}
                />
                <label className="text">Transaction Date:</label>
                <input
                    type="text"
                    name="transactionDate"
                    value={transaction.transactionDate || ''}
                    className="input"
                    disabled={true}
                />
                <label className="text">Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={transaction.amount || ''}
                    className="input"
                    disabled={true}
                />
                <label className="text">Recipient:</label>
                <input
                    type="text"
                    name="recipientSender"
                    value={transaction.recipientSender || ''}
                    className="input"
                    disabled={true}
                />
                <label className="text">Description:</label>
                <input
                    type="text"
                    name="description"
                    value={transaction.description || ''}
                    className="input"
                    disabled={true}
                />
                <label className="text">Type:</label>
                <input
                    type="text"
                    name="type"
                    value={transaction.type || ''}
                    className="input"
                    disabled={true}
                />
                <label className="text">Status:</label>
                <input
                    type="text"
                    name="status"
                    value={transaction.status || ''}
                    className="input"
                    disabled={true}
                />
                <div className="buttons">
                    <Button label="Done" type="confirm" onClick={onCancel}/>
                </div>
            </Card>
        </div>
    );
}

export default View;
