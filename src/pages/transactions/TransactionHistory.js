import React, { useEffect, useState } from 'react';
import {TransactionsHeader} from "../../transactions/TransactionsHeader";

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
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

    const showTransactionDetails = (transaction) => {
        setSelectedTransaction(transaction); // Set the selected transaction
    };

    return (
        <>
            <TransactionsHeader />

            <div style={{ backgroundColor: '#282c34', color: 'white', padding: '20px', margin: '0', display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                <h1>Transaction History</h1>

                <div>
                    <label>
                        Start Date:
                        <input
                            type="date"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                            style={{margin: '0 5px'}}
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            type="date"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                            style={{margin: '0 5px'}}
                        />
                    </label>
                    <input
                        type="text"
                        placeholder="Type"
                        value={filters.type}
                        onChange={(e) => setFilters({...filters, type: e.target.value})}
                        style={{margin: '0 5px'}}
                    />
                    <input
                        type="text"
                        placeholder="Status"
                        value={filters.status}
                        onChange={(e) => setFilters({...filters, status: e.target.value})}
                        style={{margin: '0 5px'}}
                    />
                    <button onClick={applyFilters} style={{margin: '0 5px'}}>Filter</button>
                </div>

                {filteredTransactions.length > 0 ? (
                    <table style={{
                        width: '80%',
                        borderCollapse: 'collapse',
                        marginTop: '20px',
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>
                    <thead>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Transaction Date</th>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Amount</th>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Recipient</th>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Type</th>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredTransactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{transaction.transactionDate}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>${transaction.amount}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{transaction.recipientSender}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{transaction.type}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{transaction.status}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                                    <button
                                        style={{
                                            padding: '5px 10px',
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            backgroundColor: '#61DAFB',
                                            color: 'black',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => showTransactionDetails(transaction)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p><strong>No transactions found for the selected filters.</strong></p> // Display a message if no results
                )}

                {selectedTransaction && (
                    <div style={{
                        width: '80%',
                        marginTop: '20px',
                        padding: '20px',
                        backgroundColor: 'lightcoral',
                        color: 'black',
                        borderRadius: '10px',
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>
                        <h2>Transaction Details</h2>
                        <p><strong>Transaction ID:</strong> {selectedTransaction.transactionId}</p>
                        <p><strong>Account ID:</strong> {selectedTransaction.account.id}</p>
                        <p><strong>Recipient:</strong> {selectedTransaction.recipientSender}</p>
                        <p><strong>Description:</strong> {selectedTransaction.description}</p>
                        <p><strong>Type:</strong> {selectedTransaction.type}</p>
                        <p><strong>Amount:</strong> ${selectedTransaction.amount}</p>
                        <p><strong>Payment Date:</strong> {selectedTransaction.transactionDate}</p>
                        <p><strong>Status:</strong> {selectedTransaction.status}</p>
                        <button
                            style={{
                                marginTop: '10px',
                                padding: '5px 10px',
                                backgroundColor: '#61DAFB',
                                color: 'black',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectedTransaction(null)}
                        >
                            Close Details
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default TransactionHistory;
