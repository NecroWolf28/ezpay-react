import React from 'react';
import './Settings.css';

const Settings = ({toggleDarkMode, darkMode}) => (
    <div className="settings-container">
        <h1 className="settings-title">Settings</h1>
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
    </div>
);

export default Settings;
