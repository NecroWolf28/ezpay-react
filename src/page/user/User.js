import React, {useEffect, useState} from 'react';
import Dialog from '../../components/lib/Dialog';
import './User.css';
import Account from "../../components/user/Account";
import Personal from "../../components/user/Personal";

function User() {
    const [confirmation, setConfirmation] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('confirmation') === 'true') {
            setConfirmation(true);
        }
    }, []);

    const handleDismiss = () => {
        setConfirmation(false);
        const params = new URLSearchParams(window.location.search);
        params.delete('confirmation');
        window.history.replaceState({}, '', `${window.location.pathname}`);
    };

    return (
        <div className="user-page">
            {confirmation && (
                <Dialog message="Information updated successfully!" onDismiss={handleDismiss}/>
            )}
            <h1 className="page-title">User Information</h1>
            <Account/>
            <Personal/>
        </div>
    );
}

export default User;
