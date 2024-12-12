import {TransactionsHeader} from "../../components/TransactionsHeader";

function TransactionsMenu() {
    return (<>
            <TransactionsHeader/>
            <div style={{backgroundColor: '#282c34', color: 'white', padding: '20px', margin: '0', display: "flex", flexDirection: 'column', alignItems: 'center'}}>
                <h1>Welcome to the Transactions Menu</h1>

                <h2>Navigate to the above pages by clicking on the buttons</h2>

                    1. Go back to main menu<br/>
                    2. You are already on this page<br/>
                    3. Check your Transaction History and Filter Transactions<br/>
                    4. About Transactions page<br/>
            </div>
        </>
    )
}

export default TransactionsMenu;