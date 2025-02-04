import React from "react";
import { useAuth } from "../auth/authContext";

const ProfileLoggedIn = () => {
    const { user } = useAuth();

    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <h3>Username: {user.username || "Unknown"}</h3>
            <p>Email: {user.email}</p>
            <p>Account Age: {calculateAccountAge(user.dateCreated)} days</p>
        </div>
    );
};

function calculateAccountAge(dateCreated) {
    if (!dateCreated) return "Unknown";

    const date = new Date(dateCreated);
    const now = new Date();
    const diff = now - date;
    return Math.floor(diff / 1000 / 60 / 60 / 24);
}

export default ProfileLoggedIn;
