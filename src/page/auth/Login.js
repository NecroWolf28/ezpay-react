import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import Card from '../../components/lib/Card';
import Dialog from '../../components/lib/Dialog';
import './Login.css';
import Button from "../../components/lib/Button";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);
    const {login} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const recoverMessage = localStorage.getItem('recoverSuccessMessage');
        if (recoverMessage) {
            setSuccessMessage(recoverMessage);
            setDialogVisible(true);
            localStorage.removeItem('recoverSuccessMessage');
        }
    }, []);

    const handleLogin = () => {
        fetch('http://localhost:8081/api/customer/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Invalid username or password');
                }
                return response.json();
            })
            .then((data) => {
                login(data);
                navigate('/user');
            })
            .catch((err) => setError(err.message));
    };

    const handleRecoverPassword = () => {
        navigate('/recover');
    };

    const handleDialogDismiss = () => {
        setDialogVisible(false);
    };

    return (
        <div className="login-page">
            <h1 className="page-title">Please Login to Continue</h1>
            {dialogVisible && (
                <Dialog message={successMessage} onDismiss={handleDialogDismiss}/>
            )}
            <Card>
                <label className="text">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="input"
                />
                <label className="text">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input"
                />
                {error && <label className="error">{error}</label>}
                <div className="buttons">
                    <Button label="Login" onClick={handleLogin} type="confirm"/>
                    <Button label="Forgot Password" onClick={handleRecoverPassword} type="cancel"/>
                </div>
            </Card>
        </div>
    );
}

export default Login;
