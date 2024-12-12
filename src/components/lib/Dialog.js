import React from 'react';
import './Dialog.css';
import Card from "./Card";

function Dialog({message, onDismiss}) {
    return (
        <Card>
            <div className="dialog">
                {message}
                <button className="dismiss-button" onClick={onDismiss}>&times;</button>
            </div>
        </Card>
    );
}

export default Dialog;
