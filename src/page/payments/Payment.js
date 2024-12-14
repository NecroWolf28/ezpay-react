import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";

function Payment(){

    const navigate = useNavigate();


    return (
        <>
            <div className="Container">
                <div className="row">
                    <div className="col-md-6">
                            <h2>Payments</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button onClick={() => navigate("/payments/upi")}>UPI Payment</button>
                    </div>
                    <div className="col-md-6">
                        <button onClick={() => navigate("/payments/bank-transfer")}>Bank Transfer</button>
                    </div>
                </div>
            </div>

        </>

    )
}
            export default Payment;