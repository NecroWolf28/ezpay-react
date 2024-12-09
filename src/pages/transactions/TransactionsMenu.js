import React, {useEffect, useState} from 'react';

function TransactionsMenu() {
    const [transactions, setTransactions] = useState([]);

    // Fetch transactions from the backend when the component mounts
    useEffect(() => {
        fetch("http://localhost:8081/api/transactions/list")
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.error("Error fetching transactions:", error));
    }, []);

    return (
        <>
            <h1 style={{backgroundColor: '#282c34', color: 'white', padding: '20px', margin: '0'}}>
                Navigate to the above pages by clicking on the buttons
            </h1>

            <div style={{backgroundColor: '#282c34', color: 'white', padding: '20px', margin: '0'}}>
                <h2>Transactions List</h2>
                <ul>
                    {transactions.length > 0 ? (
                        transactions.map(transaction => (
                            <li key={transaction.id} style={{marginBottom: '10px'}}>
                                <span style={{color: '#61DAFB'}}>{transaction.name}</span> -
                                <strong>${transaction.amount}</strong>
                            </li>
                        ))
                    ) : (
                        <p>Loading transactions...</p>
                    )}
                </ul>
            </div>
        </>
    );
}

export default TransactionsMenu;
