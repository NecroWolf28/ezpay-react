import "./App.css";
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {UserProvider} from './contexts/UserContext';
import Header from './components/Header';
import UserPage from './pages/user/UserPage';
import UserEditPage from './pages/user/UserEditPage';
import TransactionHistory from './pages/transactions/pages/TransactionHistory';
import Settings from './pages/settings/Settings';
import LoginPage from "./pages/login/LoginPage";
import PrivateRoute from "./PrivateRoute";

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
                            <LoginPage toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>}
                        />
                        <Route path="/user" element={<PrivateRoute>
                            <UserPage toggleDarkMode={toggleDarkMode} darkMode={darkMode}/></PrivateRoute>}
                        />
                        <Route path="/user/edit" element={<PrivateRoute>
                            <UserEditPage toggleDarkMode={toggleDarkMode} darkMode={darkMode}/></PrivateRoute>}
                        />
                        <Route path="/transactions" element={<PrivateRoute>
                            <TransactionHistory toggleDarkMode={toggleDarkMode} darkMode={darkMode}/></PrivateRoute>}
                        />
                        <Route path="/settings" element={<PrivateRoute>
                            <Settings toggleDarkMode={toggleDarkMode} darkMode={darkMode}/></PrivateRoute>}
                        />
                        <Route path="*" element={<Navigate to="/user" replace/>}/>
                    </Routes>
                </BrowserRouter>

            </UserProvider>
        </div>
    );
}

export default App;
