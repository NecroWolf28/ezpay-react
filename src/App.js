import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TransactionsMenu from './pages/transactions/TransactionsMenu';
import TransactionsAbout from './pages/transactions/TransactionsAbout';
import Header from './components/Header';
import Settings from './pages/settings/Settings';
import {useEffect, useState} from 'react';
import UserPage from "./pages/user/UserPage";
import UserEditPage from "./pages/user/UserEditPage";
import TransactionHistory from "./pages/transactions/TransactionHistory";

function App() {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkMode') === 'true'
    );

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Header darkMode={darkMode}/>
                <Routes>
                    <Route path="/transactions" element={<TransactionsMenu/>}/>
                    <Route path="/transactions/about" element={<TransactionsAbout/>}/>
                    <Route path="/transactions/history" element={<TransactionHistory/>}/>
                    <Route path="/settings" element={<Settings toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>}/>
                    <Route path="/user" element={<UserPage toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>}/>
                    <Route path="/user/edit"
                           element={<UserEditPage toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
