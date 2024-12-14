import {useRef} from "react";
import {useEffect , useState } from "react";

function BankTransfer() {
    let accountIdRef = useRef();
    let amountRef = useRef();
    let recipientRef = useRef();
    let descRef = useRef();
    const [accountId, setAccountId] = useState('');

    useEffect(() => {
        // Retrieve user object from local storage
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.account && user.account.id) {
            const accountId = user.account.id; // Extract the account ID
            console.log('Account ID:', accountId); // Debugging log to check if it's correct
            setAccountId(accountId); // Assuming you want to store it in a state variable
            accountIdRef.current.value = accountId; // Optionally assign it to the input field
        } else {
            console.error('Account ID not found in user data.');
            alert('Account ID not found in user data.');
        }
    }, []);


    const sendTransfer = async () => {
        let variables = {
            "senderAccountId": accountIdRef.current.value,
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

        <div className="Container">
            <div className="row">
                <div className="col-md-6">
                    <h2>Bank Transfer</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <input ref={accountIdRef} type="text" placeholder="Account ID" readOnly/>
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

                        <button onClick={() => sendTransfer()}>Make Transfer</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BankTransfer;
