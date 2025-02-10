import React, { useState, useEffect } from "react";
import { useRegister } from "../auth/authHooks";
import SlideInNotifications from "../components/notification";
import { useAuth } from "../auth/authContext";

const Register = () => {
    const { handleRegister, loading, error } = useRegister();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuth();

    const addNotification = (text, type) => {
        const id = Date.now();
        setNotifications((prev) => [{ id, text, type }, ...prev]);
    };

    const removeNotif = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password || !confirmPassword) {
            addNotification("Please fill in all fields", "error");
            return;
        }
        if (password !== confirmPassword) {
            addNotification("Passwords do not match", "error");
            return;
        }
    
        try {
            let result = await handleRegister(email, password);

            if (result.error) {
                addNotification(result.error, "error");
                return; 
            } else {
                addNotification("Registration successful! Redirecting to home page...", "success");
    
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            }

        } catch (err) {
            addNotification("Error registering: " + err.message, "error");
        }
    };
    
    useEffect(() => {
        if (user) {
            window.location.href = "/";
        }
    }, [user]);

    return (
        <div className="register-login-notification">
            <SlideInNotifications notifications={notifications} removeNotif={removeNotif} />
        
            <div className="register-login-page">
                <form onSubmit={handleSubmit} className="register-login-form">
                    <h1>Register</h1>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button className="register-login-button" type="submit" disabled={loading}>Register</button>
                    {loading && <p>Loading...</p>}
                </form>
                <a href="/login">Already have an account?</a>
            </div>
        </div>
    );
};

export default Register;
