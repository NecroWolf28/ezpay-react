import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import Dialog from '../../components/lib/Dialog';
import Button from '../../components/lib/Button';
import Card from '../../components/lib/Card';
import './User.css';

function User() {
    const {user} = useContext(UserContext);
    const [confirmation, setConfirmation] = React.useState(false);

    React.useEffect(() => {
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

    if (!user) {
        return <div className="page-container">Loading user information...</div>;
    }

    return (
        <div className="user-page">
            {confirmation && (
                <Dialog message="Information updated successfully!" onDismiss={handleDismiss}/>
            )}
            <h1 className="page-title">User Information</h1>
            <Card>
                <label className="text">Name:</label>
                <input
                    value={user.name}
                    disabled={true}
                    className="input"
                />
                <label className="text">Username:</label>
                <input
                    value={user.username}
                    disabled={true}
                    className="input"
                />
                <label className="text">Email:</label>
                <input
                    value={user.email}
                    disabled={true}
                    className="input"
                />
                <Link to="/user/edit">
                    <Button label="Edit" type="confirm"/>
                </Link>
            </Card>
        </div>
    );
}

export default User;
