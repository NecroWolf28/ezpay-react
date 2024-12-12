import React from 'react';

function TransactionsTable({ transactions, onEdit, onCancel }) {
    return (
        transactions.length > 0 ? (
            <table style={{
                width: '80%',
                borderCollapse: 'collapse',
                marginTop: '20px',
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: '#282c34',
                color: 'white'
            }}>
                <thead>
                <tr style={{textAlign: 'left'}}>
                    <th style={{padding: '8px'}}>Transaction Date</th>
                    <th style={{padding: '8px'}}>Amount</th>
                    <th style={{padding: '8px'}}>Recipient</th>
                    <th style={{padding: '8px'}}>Type</th>
                    <th style={{padding: '8px'}}>Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.transactionId}>
                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
                            {transaction.transactionDate}
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
                            ${transaction.amount}
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
                            {transaction.recipientSender}
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
                            {transaction.type}
                        </td>
                        <td style={{ padding: '8px', borderLeft: '1px solid #ddd', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                            {transaction.status}
                        </td>
                        <td style={{ padding: '8px', borderRight: '1px solid #ddd', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                            {(transaction.status === 'Initiated' || transaction.status === 'Processing') && (
                                <>
                                    <button
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#61DAFB',
                                            color: 'black',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => onEdit(transaction)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: 'lightcoral',
                                            color: 'black',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginLeft: '10px',
                                        }}
                                        onClick={() => onCancel(transaction)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        ) : (
            <p><strong>No transactions found for the selected filters.</strong></p>
        )
    );
}

export default TransactionsTable;
