import React from 'react';
import './ConfirmationDialog.css';

function ConfirmationDialog({message, onDismiss}) {
    return (
        <div className="confirmation-box">
            {message}
            <button className="dismiss-button" onClick={onDismiss}>
                &times;
            </button>
        </div>
    );
}

export default ConfirmationDialog;
