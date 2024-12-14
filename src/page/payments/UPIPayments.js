import {useRef} from "react";

function UPIPayments() {
    let accountRef = useRef();
    let amountRef = useRef();
    let recipientRef = useRef();
    let descRef = useRef();


    const sendPayment = async () => {
        let variables = {
            "accountId": accountRef.current.value,
            "amount": amountRef.current.value,
            "recipientUPI": recipientRef.current.value,
            "description": descRef.current.value
        }

        const res = await fetch("http://localhost:8081/api/payment/upiPayment",
            {"method":"POST",
                "body":JSON.stringify(variables),
            "headers":{"Content-Type":"application/json"}});
        const data = await res.json();
        console.log(data);
    }

    return (

        <div className="Container">
         <div className="row">
            <div className="col-md-6">
                <h2>UPI Payments</h2>
            </div>
         </div>
            <div className="row">
                <div className="col-md-6">
                    <input ref={accountRef} type="text" placeholder="Enter account id"/>
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
        </div>
    );
}

export default UPIPayments;