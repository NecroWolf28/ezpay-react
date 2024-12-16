import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {useNavigate} from 'react-router-dom';
import './Header.css';
import logoIcon from '../../assets/logo.png';
import userIcon from '../../assets/header/user.png';
import paymentIcon from '../../assets/header/payment.png';
import transactionIcon from '../../assets/header/transaction.png';
import settingsIcon from '../../assets/header/settings.png';
import logoutIcon from '../../assets/header/logout.png';

const Header = () => {
    const {user, logout} = useContext(UserContext);
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState(window.location.pathname);

    useEffect(() => {
        const handleLocationChange = () => setCurrentTab("/" + window.location.pathname.split('/')[1]);
        window.addEventListener('popstate', handleLocationChange);
        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (<header className="header">
        <a href="/user" className="logo">
            <img src={logoIcon} alt="Logo"/>
        </a>
        {user && (<nav className="header-nav">
                <a href="/user"
                   className={`nav-item ${currentTab === '/user' ? 'active-tab' : ''}`}>
                        <span className="nav-icon">
                            <img src={userIcon} alt="User"/>
                        </span>
                    <span className="nav-text">User</span>
                </a>
                <a href="/payments"
                   className={`nav-item ${currentTab === '/payment' ? 'active-tab' : ''}`}>
                        <span className="nav-icon">
                            <img src={paymentIcon} alt="Payment"/>
                        </span>
                    <span className="nav-text">Payment</span>
                </a>
                <a href="/transactions"
                   className={`nav-item ${currentTab === '/transactions' ? 'active-tab' : ''}`}>
                        <span className="nav-icon">
                            <img src={transactionIcon} alt="Transactions"/>
                        </span>
                    <span className="nav-text">Transactions</span>
                </a>
                <a href="/settings"
                   className={`nav-item ${currentTab === '/settings' ? 'active-tab' : ''}`}>
                        <span className="nav-icon">
                            <img src={settingsIcon} alt="Settings"/>
                        </span>
                    <span className="nav-text">Settings</span>
                </a>
                <button onClick={handleLogout} className="nav-item">
                        <span className="nav-icon">
                            <img src={logoutIcon} alt="Logout"/>
                        </span>
                    <span className="nav-text">Logout</span>
                </button>
            </nav>
        )}
    </header>);
};

export default Header;
