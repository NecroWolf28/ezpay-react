import React, {useContext, useEffect, useRef, useState} from "react";
import Card from '../../components/lib/Card';
import Button from '../../components/lib/Button';
import './Payment.css';
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../contexts/UserContext";

function BankTransfer() {
    const {user} = useContext(UserContext);
    let accountIdRef = useRef();
    let amountRef = useRef();
    let recipientRef = useRef();
    let descRef = useRef();
    const [accountId, setAccountId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.account && user.account.id) {
            const accountId = user.account.id; // Extract the account ID
            console.log('Account ID:', accountId); // Debugging log to check if it's correct
            setAccountId(accountId); // Assuming you want to store it in a state variable
            accountIdRef.current.value = accountId; // Optionally assign it to the input field
        } else {
            console.error('Account ID not found in user data.');
            alert('Account ID not found in user data.');
        }
    }, [user]);


    const sendTransfer = async () => {
        let variables = {
            "senderAccountId": accountId,
            "recipientAccountId": recipientRef.current.value,
            "amount": amountRef.current.value,
            "description": descRef.current.value
        }
        try {
            const res = await fetch("http://localhost:8081/api/payment/bank-transfer",
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
            <h1 className="page-title">Bank Transfer</h1>
            <Card>
                <label className="text">Your Account No :</label>
                <input ref={accountIdRef} type="text" className="input" readOnly/>

                <label className="text">Transfer Amount:</label>
                <label className="hint">Current Balance: {user.account.balance.toFixed(2)}</label>
                <label className="hint">Withdraw Limit: {user.account.withdrawLimit.toFixed(2)}</label>
                <input
                    ref={amountRef}
                    type="number"
                    placeholder="Enter amount"
                    className="input"
                    min="1"
                    required
                />

                <label className="text">Recipient Account No :</label>
                <input
                    ref={recipientRef}
                    type="text"
                    placeholder="Enter recipient account no."
                    className="input"
                    required
                />

                <label className="text">Payment Purpose:</label>
                <textarea ref={descRef} placeholder="Enter Description" className="input" rows="5" required={true}/>

                <div className="buttons">
                    <Button label="Make Transfer" onClick={sendTransfer} type="confirm"/>
                    <Button label="Cancel" onClick={handleCancel} type="cancel"/>
                </div>
            </Card>
        </div>
    );
}

export default BankTransfer;
