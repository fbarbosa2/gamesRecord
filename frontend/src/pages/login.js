import React, { useState } from "react";
import { useAuth } from "../auth/authContext";
import { FaGoogle } from "react-icons/fa";
import { useEmailLogin, useLogout, useGoogleLogin } from "../auth/authHooks";
import SlideInNotifications from "../components/notification";

const Login = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    
    // Manage email & password state inside the component
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { handleEmailLogin, error, loading } = useEmailLogin();
    const { handleLogout } = useLogout();

    const { handleGoogleLogin, errorG, loadingG } = useGoogleLogin();

    // Handle form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if(!email || !password) {
            addNotification("Please fill in all fields", "error");
        } else {
            try{
                await handleEmailLogin(email, password);
                addNotification("Logged in successfully", "success");
                window.location.href = "/";
            } catch (error) {
                addNotification("Error logging in: " + error.message, "error");
            }
        }
        
            
    };

    const handleGoogleLoginPage = async () => {
        try{
            await handleGoogleLogin();
            addNotification("Logged in successfully", "success");
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } catch (error) {
            addNotification("Error logging in: " + error.message, "error");
        }
                
    };

    const addNotification = (text, type) => {
        const id = Date.now();
        setNotifications((prev) => [{ id, text, type }, ...prev]);
    };

    const removeNotif = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    if (!user) {
        return (
            <div className="register-login-notification">
                <SlideInNotifications notifications={notifications} removeNotif={removeNotif} />
                <div className="register-login-page">
                    <h1>Login</h1>
                    <form className="register-login-form" onSubmit={handleLoginSubmit}>
                        <label>Email</label>
                        <input 
                            type="email" 
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="register-login-button" type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <button className="google-login-button" onClick={handleGoogleLoginPage}><FaGoogle /> Login with Google</button>
                    <a href="/register">Don't have an account?</a> 
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Hi {user.username}! You are already logged in. Please log out to change accounts.</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }
};

export default Login;
