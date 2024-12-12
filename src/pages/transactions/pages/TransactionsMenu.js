import {TransactionsHeader} from "../../../components/TransactionsHeader";

function TransactionsMenu() {
    return (<>
            <TransactionsHeader/>
            <div style={{
                backgroundColor: '#282c34',
                color: 'white',
                padding: '20px',
                margin: '0',
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh'
            }}>
                <h1>Welcome to the Transactions Menu</h1>

                <h2>Navigate to the above pages by clicking on the buttons</h2><br/>

                1. Go back to main menu<br/><br/>
                2. You are already on this page<br/><br/>
                3. Check your Transaction History, Filter Transactions and Edit Transactions<br/>
            </div>
        </>
    )
}

export default TransactionsMenu;