import React from "react";
import {useNavigate} from "react-router-dom";
import Card from '../../components/lib/Card';
import Button from '../../components/lib/Button';
import './Payment.css';

function Payment() {
    const navigate = useNavigate();

    const handlePayment = () => {
        navigate('/payment/upi');
    };

    const handleTransfer = () => {
        navigate('/payment/transfer');
    };

    return (
        <div className="payment-page">
            <h1 className="page-title">Payments</h1>
            <Card>
                <div className="buttons">
                    <Button label="UPI Payment" type="confirm" onClick={handlePayment}/>
                    <Button label="Bank Transfer" type="confirm" onClick={handleTransfer}/>
                </div>
            </Card>
        </div>
    )
}

export default Payment;