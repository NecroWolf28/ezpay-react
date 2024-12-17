import Card from "../lib/Card";
import React, {useContext, useEffect, useState} from "react";
import "./Account.css";
import {UserContext} from "../../contexts/UserContext";

function Account() {
    const {user} = useContext(UserContext);
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            console.log(user)
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

    if (!user || loading) {
        return (
            <div className="account-view">
                <Card>
                    <h2 className="section-title">Loading Account Information...</h2>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="account-view">
                <Card>
                    <h2 className="section-title">Error: {error}</h2>
                </Card>
            </div>
        );
    }

    return (
        <div className="account-view">
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
        </div>
    );
}

export default Account;