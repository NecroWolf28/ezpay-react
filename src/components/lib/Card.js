import React from 'react';
import './Card.css';

function Card({children}) {
    return (
        <div className="card">
            <div className="card-content">
                {children}
            </div>
        </div>
    );
}

export default Card;
