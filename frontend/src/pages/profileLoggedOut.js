import React from "react";

const ProfileLoggedOut = () => {

    const handleLoginClick = () => {
        window.location.href = "/login";
    };

    return (
        <div className="profile-page">
            <h1>Profile</h1>
            <p>You are not logged in.</p>
            <button className="register-login-button" onClick={handleLoginClick}>Login</button>
        </div>
    );
};

export default ProfileLoggedOut;