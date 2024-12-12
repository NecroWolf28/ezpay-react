import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Card from '../../components/lib/Card';
import './Recover.css';
import Button from '../../components/lib/Button';

const Recover = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRecoverPassword = () => {
        setError('');
        if (!username) {
            setError('Please provide a username.');
            return;
        }
        fetch(`http://localhost:8081/api/customer/get/user?username=${username}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Username not found.');
                }
                return response.json();
            })
            .then((data) => {
                const email = data.email;
                const maskedEmail = email.replace(/(.{3}).+(@)/, '$1******$2');
                localStorage.setItem(
                    'recoverSuccessMessage',
                    `An email has been sent to ${maskedEmail}`
                );
                navigate('/login');
            })
            .catch((err) => {
                console.error('Error fetching email:', err);
                setError(err.message);
            });
    };

    return (
        <div className="recover-page">
            <h1 className="page-title">Password Recovery</h1>
            <Card>
                <label className="text">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="input"
                />
                {error && <label className="error">{error}</label>}
                <div className="buttons">
                    <Button label="Recover Password" type="confirm" onClick={handleRecoverPassword}/>
                </div>
            </Card>
        </div>
    );
};

export default Recover;
