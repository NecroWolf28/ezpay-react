import React from 'react';

function EditTransactionForm({ transaction, onChange, onSubmit }) {
    return (
        <div style={{
            width: '80%',
            marginTop: '20px',
            padding: '20px',
            backgroundColor: 'lightcoral',
            color: 'black',
            borderRadius: '10px',
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
            <h2>Edit Transaction</h2>
            <form>
                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={transaction.amount}
                        onChange={onChange}
                        required
                        style={{ marginBottom: '10px' }}
                    />
                </label>
                <br />
                <label>
                    Recipient:
                    <input
                        type="text"
                        name="recipientSender"
                        value={transaction.recipientSender}
                        onChange={onChange}
                        required
                        style={{ marginBottom: '10px' }}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={transaction.description || ''}
                        onChange={onChange}
                        style={{ marginBottom: '10px' }}
                    />
                </label>
                <br />
                <label>
                    Type:
                    <input
                        type="text"
                        name="type"
                        value={transaction.type || ''}
                        onChange={onChange}
                        style={{ marginBottom: '10px' }}
                    />
                </label>
                <br />
                <button
                    type="button"
                    onClick={onSubmit}
                    style={{
                        marginTop: '10px',
                        padding: '10px 20px',
                        backgroundColor: '#61DAFB',
                        color: 'black',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                >
                    Submit Changes
                </button>
            </form>
        </div>
    );
}

export default EditTransactionForm;
