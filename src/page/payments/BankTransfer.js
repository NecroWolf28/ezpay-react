import React, {useRef} from "react";
import {useEffect , useState } from "react";
import Card from '../../components/lib/Card';
import Button from '../../components/lib/Button';
import './payment.css';

function BankTransfer() {
    let accountIdRef = useRef();
    let amountRef = useRef();
    let recipientRef = useRef();
    let descRef = useRef();
    const [accountId, setAccountId] = useState('');
    const [balance, setBalance] = useState('');
    const [withdrawLimit, setWithdrawLimit] = useState('');

    useEffect(() => {
        // Retrieve user object from local storage
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.account && user.account.id) {
            const accountId = user.account.id; // Extract the account ID
            console.log('Account ID:', accountId); // Debugging log to check if it's correct
            setAccountId(accountId); // Assuming you want to store it in a state variable
            accountIdRef.current.value = accountId; // Optionally assign it to the input field
            const balance = user.account.balance;
            const limit = user.account.withdrawLimit;
            setBalance(balance);
            setWithdrawLimit(limit);
        } else {
            console.error('Account ID not found in user data.');
            alert('Account ID not found in user data.');
        }
    }, []);


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
            <h1 className="page-title">Bank Transfer</h1>
            <Card>
                <div className="form-container">
                    <div className="form-group">
                        <label className="text">Your Account No :</label>
                        {/*<label htmlFor="accountId">{accountId}</label>*/}
                        <input ref={accountIdRef} type="text" className="input" readOnly/>
                    </div>
                    <div className="form-group">
                        <label className="text">Available Balance :</label>
                        <input value={balance} type="text" placeholder="Balance" className="input" readOnly/>
                    </div>
                    <div className="form-group">
                        <label className="text">Withdraw Limit :</label>
                        <input value={withdrawLimit} type="text" placeholder="Withdraw Limit" className="input"
                               readOnly/>
                    </div>
                    <div className="form-group">
                        <label className="text">Transfer Amount:</label>
                        <input ref={amountRef} type="number" placeholder="Enter amount" className="input" min="1"
                               required={true}/>
                    </div>
                    <div className="form-group">
                        <label className="text">Recipient Account No :</label>
                        <input ref={recipientRef} type="text" placeholder="Enter recipient account no."
                               className="input" required/>
                    </div>
                    <div className="form-group">
                        <label className="text">Payment Purpose:</label>
                        <textarea ref={descRef} placeholder="Enter Description" className="input" rows="5"
                                  required={true}></textarea>
                    </div>
                    <div className="row">
                        <div className="form-group">

                            <Button label="Make Transfer" onClick={() => sendTransfer()} type="confirm"/>

                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default BankTransfer;
