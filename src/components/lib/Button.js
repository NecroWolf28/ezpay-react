import React from 'react';
import './Button.css';

function Button({label, onClick, type = 'primary', style = {}, disabled = false}) {
    const buttonClass = `button ${type}`;
    return (
        <button className={buttonClass} onClick={onClick} style={style} disabled={disabled}>
            {label}
        </button>
    );
}

export default Button;
