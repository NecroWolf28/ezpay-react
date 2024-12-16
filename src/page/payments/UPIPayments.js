import React, {useRef} from "react";
import {useEffect , useState } from "react";
import Card from '../../components/lib/Card';
import {Link} from 'react-router-dom';
import Button from '../../components/lib/Button';
import './payment.css';

function UPIPayments() {
    let accountRef = useRef();
    let amountRef = useRef();
    let recipientRef = useRef();
    let descRef = useRef();
    const [accountId, setAccountId] = useState('');

    useEffect(() => {
        // Retrieve user object from local storage
        const user = JSON.parse(localStorage.getItem('user'));

        // Check if user exists and account is present
        if (user && user.account && user.account.id) {
            const accountId = user.account.id; // Extract the account ID
            console.log('Account ID:', accountId); // Debugging log to check if it's correct
            setAccountId(accountId); // Assuming you want to store it in a state variable
            accountRef.current.value = accountId; // Optionally assign it to the input field
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
                return;
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
            <div className="row">
                <div className="col-md-6">
                    <input ref={accountRef} type="text" placeholder="Account ID" readOnly/>
                </div>
                <div className="col-md-6">
                    <input ref={amountRef} type="text" placeholder="Enter amount"/>
                </div>
                <div className="col-md-6">
                    <input ref={recipientRef} type="text" placeholder="Enter recipient id"/>
                </div>
                <div className="col-md-6">
                    <input ref={descRef} type="text" placeholder="Enter Description"/>
                </div>
                <div className="row">
                    <div className="col-md-6">

                        <button onClick={() => sendPayment()}>ValidatePayment</button>

                    </div>
                </div>
            </div>
            </Card>
        </div>
    );
}

export default UPIPayments;