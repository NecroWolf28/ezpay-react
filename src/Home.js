function Home() {
    return (<>
            <ul>
                <li><a href={"/user/menu"}>User Menu</a></li>
                <li><a href={"/transactions/menu"}>Transactions Menu</a></li>
                <li><a href={"/payments/menu"}>Payments Menu</a></li>
            </ul>
            <div style={{backgroundColor: '#282c34', color: 'white', padding: '1px', margin: '0', height:'auto'}}>
                <h1>EZPay v1.0</h1>
                <br/>
                <h2>Welcome to the EZPay application</h2>
                <h3>Please select from the menus above</h3>
            </div>
        </>
    );
}

export default Home;
