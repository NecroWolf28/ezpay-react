import React from 'react';
import './ConfirmationDialog.css';
import Card from "./Card";

function ConfirmationDialog({message, onDismiss}) {
    return (
        <Card>
            <div className="confirm-dialog">
                {message}
                <button className="dismiss-button" onClick={onDismiss}>&times;</button>
            </div>
        </Card>
    );
}

export default ConfirmationDialog;
