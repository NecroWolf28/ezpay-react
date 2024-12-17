import Card from "../lib/Card";
import {Link} from "react-router-dom";
import Button from "../lib/Button";
import React, {useContext} from "react";
import {UserContext} from "../../contexts/UserContext";
import "./Personal.css";

function Personal() {
    const {user} = useContext(UserContext);

    return (
        <div className="personal-view">
            <Card>
                <h2 className="section-title">Personal Information</h2>
                <label className="text">Name:</label>
                <input value={user.name} disabled={true} className="input"/>

                <label className="text">Username:</label>
                <input value={user.username} disabled={true} className="input"/>

                <label className="text">Email:</label>
                <input value={user.email} disabled={true} className="input"/>

                <Link to="/user/edit">
                    <Button label="Edit" type="confirm"/>
                </Link>
            </Card>
        </div>
    );
}

export default Personal;