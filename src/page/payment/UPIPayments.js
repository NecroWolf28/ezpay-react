import React, {useContext, useEffect, useRef, useState} from "react";
import Card from '../../components/lib/Card';
import {useNavigate} from 'react-router-dom';
import Button from '../../components/lib/Button';
import './Payment.css';
import {UserContext} from "../../contexts/UserContext";

function UPIPayments() {
    const {user} = useContext(UserContext);
    let amountRef = useRef();
    let recipientRef = useRef();
    let descRef = useRef();
    const navigate = useNavigate();
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

    const sendPayment = async () => {
        let variables = {
            "accountId": account.id,
            "amount": amountRef.current.value,
            "recipientUPI": recipientRef.current.value,
            "description": descRef.current.value
        }

        try {
            const res = await fetch("http://localhost:8081/api/payment/upiPayment",
                {
                    "method": "POST",
                    "body": JSON.stringify(variables),
                    "headers": {"Content-Type": "application/json"}
                });

            if (!res.ok) {
                const error = await res.text();
                alert(`Error: ${error} `);
            } else {
                const successData = await res.text();
                alert(`${successData}!\n\nPress OK to redirect back to the Payments page.`);
                navigate("/payment");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("an error has occurred!");
        }


    }

    const handleCancel = () => {
        navigate("/payment");
    }

    if (!user || loading) {
        return (
            <div className="payment-page">
                <Card>
                    <h2 className="section-title">Loading Information...</h2>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="payment-page">
                <Card>
                    <h2 className="section-title">Error: {error}</h2>
                </Card>
            </div>
        );
    }

    return (
        <div className="payment-page">
            <h1 className="page-title">UPI Payments</h1>
            <Card>
                <label className="text">Your UPI ID :</label>
                <input value={account.id} type="text" placeholder="Account ID" className="input" readOnly/>

                <label className="text">Payment Amount :</label>
                <label className="hint">Current Balance: {account.balance.toFixed(2)}</label>
                <label className="hint">Withdraw Limit: {account.withdrawLimit.toFixed(2)}</label>
                <input ref={amountRef} type="number" placeholder="Enter amount" className="input" min="1" required/>

                <label className="text">Recipient's UPI ID:</label>
                <input ref={recipientRef} type="text" placeholder="Enter UPI ID" className="input" required/>

                <label className="text">Description :</label>
                <textarea ref={descRef} placeholder="Enter Description" className="input" rows="5" required/>

                <div className="buttons">
                    <Button label="Send Payment" onClick={sendPayment} type="confirm"/>
                    <Button label="Cancel" onClick={handleCancel} type="cancel"/>
                </div>
            </Card>
        </div>
    );
}

export default UPIPayments;