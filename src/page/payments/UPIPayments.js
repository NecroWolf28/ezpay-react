import React, {useRef} from "react";
import {useEffect , useState } from "react";
import Card from '../../components/lib/Card';
import Button from '../../components/lib/Button';
import './payment.css';

function UPIPayments() {
    let accountRef = useRef();
    let amountRef = useRef();
    let recipientRef = useRef();
    let descRef = useRef();
    const [accountId, setAccountId] = useState('');
    const [balance, setBalance] = useState('');
    const [withdrawLimit, setWithdrawLimit] = useState('');

    useEffect(() => {
        // Retrieve user object from local storage
        const user = JSON.parse(localStorage.getItem('user'));

        // Check if user exists and account is present
        if (user && user.account && user.account.id) {
            const accountId = user.account.id; // Extract the account ID
            const balance = user.account.balance;
            const limit = user.account.withdrawLimit;
            console.log('Account ID:', accountId); // Debugging log to check if it's correct
            setAccountId(accountId); // Assuming you want to store it in a state variable
            accountRef.current.value = accountId; // Optionally assign it to the input field
            setBalance(balance);
            setWithdrawLimit(limit);
        } else {
            console.error('Account ID not found in user data.');
            alert('Account ID not found in user data.');
        }
    }, []);


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

            if(!res.ok) {
                const error = await res.text();
                //console.error("ERROR:", error);
                alert(`Error: ${error} `);
            }
            else {
                // For successful responses, read the success message
                const successData = await res.text(); // ResponseEntity body can also be plain text
                alert(`Success: ${successData}`);
            }

            //const data = await res.json();
            //console.log(data);
            //alert("Success!");
        }catch(error) {
            console.error("Error:", error);
            alert("an error has occurred!");
        }
    }

    return (

        <div className="payment-page">
            <h1 className="page-title">UPI Payments</h1>
            <Card>
                <div className="form-container">
                    <div className="form-group">
                        <label className="text">Your UPI ID :</label>
                        <input ref={accountRef} type="text" placeholder="Account ID" className="input" readOnly/>
                    </div>
                    <div className="form-group">
                        <label className="text">Available Balance :</label>
                        <input value={balance} type="text" placeholder="Balance" className="input" readOnly/>
                    </div>
                    <div className="form-group">
                        <label className="text">Withdraw Limit :</label>
                        <input value={withdrawLimit} type="text" placeholder="Withdraw Limit" className="input" readOnly/>
                    </div>
                    <div className="form-group">
                        <label className="text">Payment Amount :</label>
                        <input ref={amountRef} type="number" placeholder="Enter amount" className="input" min="1"
                               required={true}/>
                    </div>
                    <div className="form-group">
                        <label className="text">Recipient's UPI ID:</label>
                        <input ref={recipientRef} type="text" placeholder="Enter UPI ID" className="input"
                               required={true}/>
                    </div>
                    <div className="form-group">
                        <label className="text">Description :</label>
                        <input ref={descRef} type="text" placeholder="Enter Description" className="input"/>
                    </div>
                    <div className="row">
                        <div className="form-group">

                            {/*<button onClick={() => sendPayment()}>ValidatePayment</button>*/}
                            <Button label="Send Payment" onClick={() => sendPayment()} type="confirm"/>

                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default UPIPayments;