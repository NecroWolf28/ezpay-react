import React, { useEffect, useState } from 'react';
import { TransactionsHeader } from "../../components/TransactionsHeader";

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [editTransaction, setEditTransaction] = useState(null); // State for editing transaction
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        status: '',
        type: ''
    });

    useEffect(() => {
        fetch("http://localhost:8081/api/transactions/list")
            .then(response => response.json())
            .then(data => {
                setTransactions(data);
                setFilteredTransactions(data);
            })
            .catch(error => console.error("Error fetching transactions:", error));
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const applyFilters = () => {
        const { startDate, endDate, status, type } = filters;

        // Construct query params
        const queryParams = new URLSearchParams();
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);
        if (status) queryParams.append('status', status);
        if (type) queryParams.append('type', type);

        // Fetch filtered transactions from the backend
        fetch(`http://localhost:8081/api/transactions/filter?${queryParams.toString()}`)
            .then(response => response.json())
            .then(data => setFilteredTransactions(data))
            .catch(error => console.error("Error fetching filtered transactions:", error));
    };

    const handleEdit = (transaction) => {
        // Set the transaction being edited
        setEditTransaction({ ...transaction, status: "Initiated" }); // Reset status to 'Initiated'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditTransaction(prevTransaction => ({ ...prevTransaction, [name]: value }));
    };

    const handleSubmitEdit = () => {
        // Send updated transaction to backend
        fetch(`http://localhost:8081/api/transactions/${editTransaction.transactionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editTransaction),
        })
            .then(response => response.json())
            .then(data => {
                setTransactions(prevTransactions =>
                    prevTransactions.map(transaction =>
                        transaction.transactionId === data.transactionId ? data : transaction
                    )
                );
                setEditTransaction(null); // Close the edit form
            }).then(() => {
            // After editing the transaction, re-fetch the list
            applyFilters();
        })
            .catch(error => console.error("Error updating transaction:", error));
    };

    const handleCancel = (transaction) => {
        // Check if the transaction is either 'initiated' or 'processing'
        if (transaction.status === 'Initiated' || transaction.status === 'Processing') {
            // Send a request to the backend to update the transaction
            fetch(`http://localhost:8081/api/transactions/cancel/${transaction.transactionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...transaction,   // Keep all current transaction fields
                    status: 'Canceled' // Reset the status to 'Canceled'
                }),
            })
                .then((response) => response.json())
                .then((updatedTransaction) => {
                    // Update the local state with the updated transaction
                    setTransactions(prevTransactions =>
                        prevTransactions.map(t =>
                            t.transactionId === updatedTransaction.transactionId ? updatedTransaction : t
                        )
                    );
                    setFilteredTransactions(prevTransactions =>
                        prevTransactions.map(t =>
                            t.transactionId === updatedTransaction.transactionId ? updatedTransaction : t
                        )
                    );
                }).then(() => {
                // After editing the transaction, re-fetch the list
                applyFilters();
            })
                .catch((error) => {
                    console.error("Error canceling transaction:", error);
                });
        }
    };


    return (
        <>
            <TransactionsHeader />

            <div style={{ backgroundColor: '#282c34', color: 'white', padding: '20px', margin: '0', display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                <h1>Transaction History</h1>

                {/* Filter UI */}
                <div>
                    <label>
                        Start Date:
                        <input
                            type="date"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                            style={{ margin: '0 5px' }}
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            type="date"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                            style={{ margin: '0 5px' }}
                        />
                    </label>
                    <input
                        type="text"
                        placeholder="Type"
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        style={{ margin: '0 5px' }}
                    />
                    <input
                        type="text"
                        placeholder="Status"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        style={{ margin: '0 5px' }}
                    />
                    <button onClick={applyFilters} style={{ margin: '0 5px' }}>Filter</button>
                </div>

                {/* Transaction List */}
                {filteredTransactions.length > 0 ? (
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
                        <tr>
                            <th>Transaction Date</th>
                            <th>Amount</th>
                            <th>Recipient</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredTransactions.map((transaction) => (
                            <tr key={transaction.transactionId}>
                                <td style={{padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left'}}>
                                    {transaction.transactionDate}
                                </td>
                                <td style={{padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left'}}>
                                    ${transaction.amount}
                                </td>
                                <td style={{padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left'}}>
                                    {transaction.recipientSender}
                                </td>
                                <td style={{padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left'}}>
                                    {transaction.type}
                                </td>
                                <td style={{padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left'}}>
                                    {transaction.status}
                                </td>
                                <td style={{padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'center'}}>
                                    {(transaction.status === 'Initiated' || transaction.status === 'Processing') && (
                                        <button
                                            style={{
                                                padding: '5px 10px',
                                                backgroundColor: '#61DAFB',
                                                color: 'black',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleEdit(transaction)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    {(transaction.status === 'Initiated' || transaction.status === 'Processing') && (
                                        <button
                                            style={{
                                                padding: '5px 10px',
                                                backgroundColor: 'lightcoral',
                                                color: 'black',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                marginLeft: '10px'
                                            }}
                                            onClick={() => handleCancel(transaction)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p><strong>No transactions found for the selected filters.</strong></p>
                )}

                {/* Edit Transaction Form */}
                {editTransaction && (
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
                                    value={editTransaction.amount}
                                    onChange={handleChange}
                                    required
                                    style={{marginBottom: '10px'}}
                                />
                            </label>
                            <br/>
                            <label>
                                Recipient:
                                <input
                                    type="text"
                                    name="recipientSender"
                                    value={editTransaction.recipientSender}
                                    onChange={handleChange}
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
                                    value={editTransaction.description || ''}
                                    onChange={handleChange}
                                    style={{ marginBottom: '10px' }}
                                />
                            </label>
                            <br />
                            <label>
                                Type:
                                <input
                                    type="text"
                                    name="type"
                                    value={editTransaction.type || ''}
                                    onChange={handleChange}
                                    style={{ marginBottom: '10px' }}
                                />
                            </label>
                            <br />
                            <button type="button" onClick={handleSubmitEdit} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#61DAFB', color: 'black', border: 'none', borderRadius: '5px' }}>
                                Submit Changes
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default TransactionHistory;
