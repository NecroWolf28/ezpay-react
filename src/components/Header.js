import React, {useEffect, useState} from 'react';
import './Header.css';
import userIcon from '../assets/header/user.png';
import paymentIcon from '../assets/header/payment.png';
import transactionIcon from '../assets/header/transaction.png';
import settingsIcon from '../assets/header/settings.png';

const Header = () => {
    const [currentTab, setCurrentTab] = useState(window.location.pathname);

    useEffect(() => {
        const handleLocationChange = () => setCurrentTab("/" + window.location.pathname.split('/')[1]);
        window.addEventListener('popstate', handleLocationChange);
        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    return (
        <header className="header">
            <nav className="header-nav">
                <a
                    href="/user"
                    className={`nav-item ${currentTab === '/user' ? 'active-tab' : ''}`}
                >
          <span className="nav-icon">
            <img src={userIcon} alt="User"/>
          </span>
                    <span className="nav-text">User</span>
                </a>
                <a
                    href="/payment"
                    className={`nav-item ${currentTab === '/payment' ? 'active-tab' : ''}`}
                >
          <span className="nav-icon">
            <img src={paymentIcon} alt="Payment"/>
          </span>
                    <span className="nav-text">Payment</span>
                </a>
                <a
                    href="/transactions"
                    className={`nav-item ${
                        currentTab === '/transactions' ? 'active-tab' : ''
                    }`}
                >
          <span className="nav-icon">
            <img src={transactionIcon} alt="Transactions"/>
          </span>
                    <span className="nav-text">Transactions</span>
                </a>
                <a
                    href="/settings"
                    className={`nav-item ${currentTab === '/settings' ? 'active-tab' : ''}`}
                >
          <span className="nav-icon">
            <img src={settingsIcon} alt="Settings"/>
          </span>
                    <span className="nav-text">Settings</span>
                </a>
            </nav>
        </header>
    );
};

export default Header;
