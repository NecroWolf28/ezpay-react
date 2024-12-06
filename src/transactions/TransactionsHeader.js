import './TransactionsHeader.css'
export const TransactionsHeader = () => {
    return <>
        <ul>
            <li><a href={"/menu"}>Main Menu</a></li>
            <li><a href={"/transactions/about"}>Transactions Info</a></li>
        </ul>
    </>
}