import {TransactionsHeader} from "./TransactionsHeader";

function TransactionsAbout() {
    return (<>
            <TransactionsHeader/>
            <h1 style={{ backgroundColor: '#282c34', color: 'white', padding: '20px', margin:'0'}}>This is a page for information about transactions</h1>
        </>
    )
}

export default TransactionsAbout;