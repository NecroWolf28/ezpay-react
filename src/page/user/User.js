import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import Dialog from '../../components/lib/Dialog';
import Button from '../../components/lib/Button';
import Card from '../../components/lib/Card';
import './User.css';

function User() {
    const {user} = useContext(UserContext);
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmation, setConfirmation] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('confirmation') === 'true') {
            setConfirmation(true);
        }

        if (user) {
            fetch(`http://localhost:8081/api/account/get?id=${user.account.id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch account information.');
                    }
                    return response.json();
                })
                .then((data) => {
                    setAccount(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleDismiss = () => {
        setConfirmation(false);
        const params = new URLSearchParams(window.location.search);
        params.delete('confirmation');
        window.history.replaceState({}, '', `${window.location.pathname}`);
    };

    if (!user || loading) {
        return <div className="page-container">Loading user information...</div>;
    }

    if (error) {
        return <div className="page-container error-container">Error: {error}</div>;
    }

    return (
        <div className="user-page">
            {confirmation && (
                <Dialog message="Information updated successfully!" onDismiss={handleDismiss}/>
            )}
            <h1 className="page-title">User Information</h1>

            <Card>
                <h2 className="section-title">Account Information</h2>
                <label className="text">Balance:</label>
                <input value={`$${account.balance.toFixed(2)}`} disabled={true} className="input"/>

                <label className="text">Withdraw Limit:</label>
                <input
                    value={`$${account.withdrawLimit.toFixed(2)}`}
                    disabled={true}
                    className="input"
                />

                <label className="text">Overdraft Limit:</label>
                <input
                    value={`$${account.overdraftLimit.toFixed(2)}`}
                    disabled={true}
                    className="input"
                />
            </Card>

            <Card>
                <h2 className="section-title">Personal Information</h2>
                <label className="text">Name:</label>
                <input value={user.name} disabled={true} className="input"/>

                <label className="text">Username:</label>
                <input value={user.username} disabled={true} className="input"/>

                <label className="text">Email:</label>
                <input value={user.email} disabled={true} className="input"/>

                <Link to="/user/edit">
                    <Button label="Edit" type="confirm"/>
                </Link>
            </Card>
        </div>
    );
}

export default User;
