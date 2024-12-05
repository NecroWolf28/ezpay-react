import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TransactionsMenu from "./transactions/TransactionsMenu";
import Home from "./Home";
import TransactionsAbout from "./transactions/TransactionsAbout";

function App() {
  return (
    <div className="App" >
        <BrowserRouter>
            <Routes>
                <Route path="/transactions/menu" element={<TransactionsMenu />} />
                <Route path="/menu" element={<Home />} />
                <Route path="/transactions/about" element={<TransactionsAbout />} />
            </Routes>
        </BrowserRouter>
        <header className="App-header" >
            <img src={logo} className="App-logo" alt="logo" style={{height:'100%', width:'70%'}} />
        </header>
    </div>
  );
}

export default App;
