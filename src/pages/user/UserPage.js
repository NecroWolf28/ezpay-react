import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import Button from '../../components/Button';
import './UserPage.css';

function UserPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmation, setConfirmation] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8081/api/customer/get?id=1')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user information');
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

        const params = new URLSearchParams(window.location.search);
        if (params.get('confirmation') === 'true') {
            setConfirmation(true);
        }
    }, []);

    const handleDismiss = () => {
        setConfirmation(false);
        const params = new URLSearchParams(window.location.search);
        params.delete('confirmation');
        window.history.replaceState({}, '', `${window.location.pathname}`);
    };

    if (loading) {
        return <div className="page-container">Loading user information...</div>;
    }

    if (error) {
        return <div className="page-container error-container">Error: {error}</div>;
    }

    return (
        <div className="user-page">
            {confirmation && (
                <ConfirmationDialog
                    message="Information updated successfully!"
                    onDismiss={handleDismiss}
                />
            )}
            <h1 className="page-title">User Information</h1>
            <div className="card">
                <div className="card-content">
                    <span><strong>Name:</strong> {user.name}</span>
                    <span><strong>Username:</strong> {user.username}</span>
                    <span><strong>Email:</strong> {user.email}</span>
                </div>
                <Link to="/user/edit">
                    <Button label="Edit" type="confirm" />
                </Link>
            </div>
        </div>
    );
}

export default UserPage;
