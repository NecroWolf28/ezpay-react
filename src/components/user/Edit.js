import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import Button from '../lib/Button';
import Card from '../lib/Card';
import './Edit.css';

function Edit() {
    const {user, login} = useContext(UserContext); // Using UserContext to get and update the user
    const [formData, setFormData] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSave = () => {
        const changes = Object.keys(formData).reduce((acc, key) => {
            if (formData[key] !== user[key]) {
                acc[key] = formData[key];
            }
            return acc;
        }, {id: user.id});

        fetch('http://localhost:8081/api/customer/update', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(changes),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update user information');
                }
                return response.json();
            })
            .then((updatedUser) => {
                login(updatedUser); // Update the user in UserContext
                navigate('/user?confirmation=true');
            })
            .catch((err) => setError(err.message));
    };

    const handleCancel = () => {
        navigate('/user');
    };

    if (!user) {
        return <div className="page-container">Loading user information...</div>;
    }

    if (error) {
        return <div className="page-container error-container">Error: {error}</div>;
    }

    return (
        <div className="user-edit-page">
            <h1 className="page-title">Edit User Information</h1>
            <Card>
                <label className="text">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="input"
                />
                <label className="text">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username || ''}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="input"
                />
                <label className="text">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="input"
                />
                <div className="buttons">
                    <Button label="Save" type="confirm" onClick={handleSave}/>
                    <Button label="Cancel" type="cancel" onClick={handleCancel}/>
                </div>
            </Card>
        </div>
    );
}

export default Edit;
