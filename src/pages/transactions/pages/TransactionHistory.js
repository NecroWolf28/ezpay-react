import React, { useEffect, useState } from 'react';
import { TransactionsHeader } from "../../../components/TransactionsHeader";
import EditTransactionForm from "../components/EditTransactionForm";
import TransactionsTable from "../components/TransactionsTable";
import TransactionsFilter from "../components/TransactionsFilter";

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

    return (<>
        <TransactionsHeader/>
        <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#282c34', color: 'white', height: '100vh' }}>

            <h1>Transaction History</h1>

            <TransactionsFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onApplyFilters={applyFilters}
            />

            {editTransaction ? (
                <EditTransactionForm
                    transaction={editTransaction}
                    onChange={handleChange}
                    onSubmit={handleSubmitEdit}
                />
            ) : (
                <TransactionsTable
                    transactions={filteredTransactions}
                    onEdit={handleEdit}
                    onCancel={handleCancel}
                />
            )}
        </div>
        </>
    );

}

export default TransactionHistory;
