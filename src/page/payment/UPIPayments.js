import React, {useContext, useEffect, useRef} from "react";
import Card from '../../components/lib/Card';
import {useNavigate} from 'react-router-dom';
import Button from '../../components/lib/Button';
import './Payment.css';
import {UserContext} from "../../contexts/UserContext";

function UPIPayments() {
    const {user} = useContext(UserContext);
    let accountRef = useRef();
    let amountRef = useRef();
    let recipientRef = useRef();
    let descRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.account && user.account.id) {
            accountRef.current.value = user.account.id;
        } else {
            console.error('Account ID not found in user data.');
            alert('Account ID not found in user data.');
        }
    }, [user]);

    const sendPayment = async () => {
        let variables = {
            "accountId": accountRef.current.value,
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
                alert(`Success: ${successData}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("an error has occurred!");
        }
    }

    const handleCancel = () => {
        navigate("/payment");
    }

    return (
        <div className="payment-page">
            <h1 className="page-title">UPI Payments</h1>
            <Card>
                <label className="text">Your UPI ID :</label>
                <input ref={accountRef} type="text" placeholder="Account ID" className="input" readOnly/>

                <label className="text">Payment Amount :</label>
                <label className="hint">Current Balance: {user.account.balance.toFixed(2)}</label>
                <label className="hint">Withdraw Limit: {user.account.withdrawLimit.toFixed(2)}</label>
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