function Home() {
    return (<>
            <ul>
                <li><a href={"/transactions/menu"}>Transactions Menu</a></li>
            </ul>
            <div style={{backgroundColor: '#282c34', color: 'white', padding: '1px', margin: '0', height:'auto'}}>
                <h1>Home page for EZPay</h1>
                <h3>Select from the menus above</h3>
            </div>
        </>
    );
}

export default Home;
