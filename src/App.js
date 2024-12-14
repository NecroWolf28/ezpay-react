import "./App.css";
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {UserProvider} from './contexts/UserContext';
import Header from './components/lib/Header';
import User from './page/user/User';
import Edit from './components/user/Edit';
import Transaction from './page/transactions/Transaction';
import Settings from './page/settings/Settings';
import Login from "./page/auth/Login";
import PrivateRoute from "./PrivateRoute";
import Recover from "./page/auth/Recover";
import Payment from "./page/payments/";
import UPIPayments from "./page/payments/UPIPayments";
import BankTransfer from "./page/payments/BankTransfer";

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
        <div className={`${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <UserProvider>
                <BrowserRouter>
                    <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
                    <Routes>
                        <Route path="/login" element={
                            <Login toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>}
                        />
                        <Route path="/recover" element={
                            <Recover toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>}
                        />
                        <Route path="/user" element={<PrivateRoute>
                            <User toggleDarkMode={toggleDarkMode} darkMode={darkMode}/></PrivateRoute>}
                        />
                        <Route path="/user/edit" element={<PrivateRoute>
                            <Edit toggleDarkMode={toggleDarkMode} darkMode={darkMode}/></PrivateRoute>}
                        />
                        <Route path="/transactions" element={<PrivateRoute>
                            <Transaction toggleDarkMode={toggleDarkMode} darkMode={darkMode}/></PrivateRoute>}
                        />
                        <Route path="/settings" element={<PrivateRoute>
                            <Settings toggleDarkMode={toggleDarkMode} darkMode={darkMode}/></PrivateRoute>}
                        />
                        <Route path="/payments" element={<PrivateRoute>
                            <Payment toggleDarkMode={toggleDarkMode} darkMode={darkMode}/></PrivateRoute>}
                        />
                        <Route path="/payments/upi" element={<PrivateRoute>
                            <UPIPayments toggleDarkMode={toggleDarkMode} darkMode={darkMode}/></PrivateRoute>}
                        />
                        <Route path="/payments/bank-transfer" element={<PrivateRoute>
                            <BankTransfer toggleDarkMode={toggleDarkMode} darkMode={darkMode}/></PrivateRoute>}
                        />
                        <Route path="*" element={<Navigate to="/user" replace/>}/>
                    </Routes>
                </BrowserRouter>

            </UserProvider>
        </div>
    );
}

export default App;
