import React, {useContext, useEffect, useState} from 'react';
import Edit from '../../components/transactions/Edit';
import Table from '../../components/transactions/Table';
import Filter from '../../components/transactions/Filter';
import Dialog from '../../components/lib/Dialog';
import './Transaction.css';
import {UserContext} from "../../contexts/UserContext";
import View from "../../components/transactions/View";

function Transaction() {
    const {user} = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState(null);
    const [viewTransaction, setViewTransaction] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        status: '',
        type: '',
    });
    const [uniqueTypes, setUniqueTypes] = useState([]);
    const [uniqueStatuses, setUniqueStatuses] = useState([]);

    useEffect(() => {
        const accountId = user?.account.id;

        if (!accountId) {
            console.error("Account ID is not available yet.");
            return;
        }

        const queryParams = new URLSearchParams();
        queryParams.append('account_id', accountId);

        fetch(`http://localhost:8081/api/transactions/filter?${queryParams.toString()}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch transactions");
                }
                return response.json();
            })
            .then((data) => {
                setTransactions(data);
                setFilteredTransactions(data);

                const types = [...new Set(data.map((t) => t.type))];
                const statuses = [...new Set(data.map((t) => t.status))];
                setUniqueTypes(types);
                setUniqueStatuses(statuses);
            })
            .catch((error) => console.error("Error fetching filtered transactions:", error));
    }, [user]);


    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        setFilters((prevFilters) => ({...prevFilters, [name]: value}));
    };

    const applyFilters = () => {
        const {startDate, endDate, status, type} = filters;
        const queryParams = new URLSearchParams();

        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);
        if (status) queryParams.append('status', status);
        if (type) queryParams.append('type', type);
        queryParams.append('account_id', user.account.id);

        fetch(`http://localhost:8081/api/transactions/filter?${queryParams.toString()}`)
            .then((response) => response.json())
            .then((data) => setFilteredTransactions(data))
            .catch((error) => console.error('Error fetching filtered transactions:', error));
    };

    const clearFilters = () => {
        setFilters({
            startDate: '',
            endDate: '',
            status: '',
            type: '',
        });
        setFilteredTransactions(transactions);
    };

    const handleEdit = (transaction) => {
        setEditTransaction({...transaction, status: 'Initiated'});
    };

    const handleSubmitEdit = () => {
        fetch(`http://localhost:8081/api/transactions/${editTransaction.transactionId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(editTransaction),
        })
            .then((response) => response.json())
            .then((updatedTransaction) => {
                setTransactions((prevTransactions) =>
                    prevTransactions.map((t) =>
                        t.transactionId === updatedTransaction.transactionId ? updatedTransaction : t
                    )
                );
                setEditTransaction(null);
                applyFilters();
                setConfirmationMessage('Transaction updated successfully!');
            })
            .catch((error) => console.error('Error updating transaction:', error));
    };

    const handleCancelEdit = () => {
        setEditTransaction(null);
    };

    const handleCancel = (transaction) => {
        if (transaction.status === 'Initiated' || transaction.status === 'Processing') {
            const updatedTransaction = {...transaction, status: 'Canceled'};
            fetch(`http://localhost:8081/api/transactions/cancel/${transaction.transactionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTransaction),
            })
                .then((response) => response.json())
                .then((updatedTransaction) => {
                    setFilteredTransactions((prevTransactions) =>
                        prevTransactions.map((t) =>
                            t.transactionId === updatedTransaction.transactionId ? updatedTransaction : t
                        )
                    );
                })
                .catch((error) => console.error('Error canceling transaction:', error));
        } else {
            alert('Transaction cannot be canceled!');
        }
    };

    const handleDismissConfirmation = () => {
        setConfirmationMessage(null);
    };

    const handleViewDetails = (transaction) => {
        setViewTransaction(transaction);
    };

    const handleCloseDetails = () => {
        setViewTransaction(null);
    };

    return (
        <div className="transactions-page">
            {!editTransaction && !viewTransaction && (
                <h1 className="page-title">Transaction History</h1>
            )}
            {confirmationMessage && (
                <Dialog
                    message={confirmationMessage}
                    onDismiss={handleDismissConfirmation}
                />
            )}
            {!editTransaction && !viewTransaction && (
                <Filter
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onApplyFilters={applyFilters}
                    onClearFilters={clearFilters}
                    uniqueTypes={uniqueTypes}
                    uniqueStatuses={uniqueStatuses}
                />
            )}
            {editTransaction ? (
                <Edit
                    transaction={editTransaction}
                    onChange={(e) =>
                        setEditTransaction({...editTransaction, [e.target.name]: e.target.value})
                    }
                    onSubmit={handleSubmitEdit}
                    onCancel={handleCancelEdit}
                />
            ) : viewTransaction ? (
                <View transaction={viewTransaction} onCancel={handleCloseDetails}/>
            ) : (
                <Table
                    transactions={filteredTransactions}
                    onEdit={handleEdit}
                    onCancel={handleCancel}
                    onViewDetails={handleViewDetails}
                />
            )}
        </div>
    );
}

export default Transaction;
