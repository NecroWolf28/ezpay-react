import React, {useEffect, useState} from 'react';
import './TransactionsMenu.css';

function TransactionsMenu() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8081/api/transactions/list")
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.error("Error fetching transactions:", error));
    }, []);

    return (
        <>
            <div className="transactions-header">
                Navigate to the above pages by clicking on the buttons
            </div>
            <div className="transactions-container">
                <h2>Transactions List</h2>
                <ul className="transactions-list">
                    {transactions.length > 0 ? (
                        transactions.map(transaction => (
                            <li key={transaction.id}>
                                <span>{transaction.name}</span> -
                                <strong>${transaction.amount}</strong>
                            </li>
                        ))
                    ) : (
                        <p className="loading-text">Loading transactions...</p>
                    )}
                </ul>
            </div>
        </>
    );
}

export default TransactionsMenu;
