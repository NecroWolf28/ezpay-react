import './TransactionsHeader.css'
export const TransactionsHeader = () => {
    return <>
        <ul>
            <li><a href={"/"}>Main Menu</a></li>
            <li><a href={"/transactions/"}>Transactions Menu</a></li>
            <li><a href={"/transactions/history"}>Transaction History</a></li>
            <li><a href={"/transactions/about"}>Transactions Info</a></li>
        </ul>
    </>
}