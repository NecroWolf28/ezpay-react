import React, {useEffect, useState} from 'react';
import EditTransactionForm from '../components/EditTransactionForm';
import TransactionTable from '../components/TransactionTable';
import TransactionFilter from '../components/TransactionFilter';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import './TransactionHistory.css';

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState(null);
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
        fetch('http://localhost:8081/api/transactions/list')
            .then((response) => response.json())
            .then((data) => {
                setTransactions(data);
                setFilteredTransactions(data);

                const types = [...new Set(data.map((t) => t.type))];
                const statuses = [...new Set(data.map((t) => t.status))];
                setUniqueTypes(types);
                setUniqueStatuses(statuses);
            })
            .catch((error) => console.error('Error fetching transactions:', error));
    }, []);

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
            fetch(`http://localhost:8081/api/transactions/cancel/${transaction.transactionId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({status: 'Canceled'}),
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
        }
    };

    const handleDismissConfirmation = () => {
        setConfirmationMessage(null);
    };

    return (
        <div className="transactions-history-page">
            {confirmationMessage && (
                <ConfirmationDialog
                    message={confirmationMessage}
                    onDismiss={handleDismissConfirmation}
                />
            )}
            {!editTransaction && <h1 className="page-title">Transaction History</h1>}
            {!editTransaction && (
                <TransactionFilter
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onApplyFilters={applyFilters}
                    onClearFilters={clearFilters}
                    uniqueTypes={uniqueTypes}
                    uniqueStatuses={uniqueStatuses}
                />
            )}
            {editTransaction ? (
                <EditTransactionForm
                    transaction={editTransaction}
                    onChange={(e) =>
                        setEditTransaction({...editTransaction, [e.target.name]: e.target.value})
                    }
                    onSubmit={handleSubmitEdit}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <TransactionTable
                    transactions={filteredTransactions}
                    onEdit={handleEdit}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}

export default TransactionHistory;
