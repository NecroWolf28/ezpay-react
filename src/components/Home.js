import logo from '../assets/EZPAY Logo.png';

const Home = () => {
    return (<>
            <div className="App" style={{color:"white", height:'100vh', alignItems: "center", justifyContent: 'flex-start', display:"flex", flexDirection:"column"}}>
            <h1>Welcome to</h1>
            <img className="App-logo" src={logo} alt="logo" style={{height: '40%', width: '40%', borderRadius:'10%', borderColor: '#4A5561FF', borderWidth: '10px', borderStyle:"solid"}} alt="logo"/>
                <h1> Your Secure and Efficient Payment Solution</h1>
            </div>
        </>
    )
}

export default Home;