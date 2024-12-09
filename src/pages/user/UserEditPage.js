import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './UserEditPage.css';

function UserEditPage() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8081/api/customer/get?id=1')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user information');
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                setFormData({name: data.name, username: data.username, email: data.email});
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

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
                navigate('/user?confirmation=true');
            })
            .catch((err) => setError(err.message));
    };

    const handleCancel = () => {
        navigate('/user');
    };

    if (loading) {
        return <div className="page-container">Loading user information...</div>;
    }

    if (error) {
        return <div className="page-container error-container">Error: {error}</div>;
    }

    return (
        <div className="page-container">
            <h1 className="page-title">Edit User Information</h1>
            <div className="edit-user-card">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="Enter your name"
                />
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username || ''}
                    onChange={handleChange}
                    placeholder="Enter your username"
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />
                <div className="button-group">
                    <button className="save-button" onClick={handleSave}>Save</button>
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default UserEditPage;
