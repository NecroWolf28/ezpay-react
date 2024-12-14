import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import Card from '../../components/lib/Card';
import {Link} from 'react-router-dom';
import Button from '../../components/lib/Button';
import './payment.css';

function Payment(){

    const navigate = useNavigate();


    return (
        <>
            <div className="payment-page">
                <h1 className="page-title">Payments</h1>
                <Card>
                    {/*<div className="row">
                        <div className="col-md-6">
                            <button onClick={() => navigate("/payments/upi")}>UPI Payment</button>
                        </div>
                        <div className="col-md-6">
                            <button onClick={() => navigate("/payments/bank-transfer")}>Bank Transfer</button>
                        </div>
                    </div>*/}
                    <div className="button-pay">
                    <Link to="/payments/upi">
                        <Button label="UPI Payment" type="confirm"/>
                    </Link>

                    <Link to="/payments/bank-transfer">
                        <Button label="Bank Transfer" type="confirm"/>
                    </Link>
                    </div>
                </Card>
            </div>

        </>

    )
}

export default Payment;