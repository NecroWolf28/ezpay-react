import React from 'react';
import './Settings.css';
import Card from '../../components/Card';

const Settings = ({ toggleDarkMode, darkMode }) => (
    <div className="settings-page">
        <h1 className="page-title">Settings</h1>
        <Card>
            <div className="settings-item">
                <label className="settings-label">Dark Mode</label>
                <div className="toggle-container">
                    <input
                        type="checkbox"
                        id="darkModeToggle"
                        className="toggle-input"
                        checked={darkMode}
                        onChange={toggleDarkMode}
                    />
                    <label htmlFor="darkModeToggle" className="toggle-slider"></label>
                </div>
            </div>
        </Card>
    </div>
);

export default Settings;
