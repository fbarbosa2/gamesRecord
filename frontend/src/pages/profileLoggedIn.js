import React, {useState} from "react";
import { useAuth } from "../auth/authContext";
import SlideInNotifications from "../components/notification";

const ProfileLoggedIn = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);

    if (!user) {
        return <p>Loading user data...</p>;
    }

    const handleEditProfile = () => {
        try {


        } catch (error) {
            addNotification("Error editing profile: " + error.message, "error");
        }
    };

    const addNotification = (text, type) => {
        const id = Date.now();
        setNotifications((prev) => [{ id, text, type }, ...prev]);
    };

    const removeNotif = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div>
            <h1>Profile</h1>
            <h3>Username: {user.username || "Unknown"}</h3>
            <p>Email: {user.email}</p>
            <p>Account Age: {calculateAccountAge(user.dateCreated)} days</p>
            <button onClick={handleEditProfile}>Edit Profile</button>
            <SlideInNotifications notifications={notifications} removeNotif={removeNotif} />
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
