import React, { useState } from "react";
import { useAuth } from "../auth/authContext";
import { FaGoogle } from "react-icons/fa";
import Alert from "../components/alert";
import { useEmailLogin, useLogout, useGoogleLogin } from "../auth/authHooks";

const Login = () => {
    const { user } = useAuth();
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    
    // Manage email & password state inside the component
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { handleEmailLogin, error, loading } = useEmailLogin();
    const { handleLogout } = useLogout();

    const { handleGoogleLogin, errorG, loadingG } = useGoogleLogin();

    // Handle form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        await handleEmailLogin(email, password);

        if (!error) {
            setAlertMessage("User logged in successfully");
            setAlertType("success");
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } else {
            setAlertMessage(error);
            setAlertType("error");
        }
    };

    const handleGoogleLoginPage = async () => {
        await handleGoogleLogin();
        if(!errorG){
            setAlertMessage("User logged in successfully");
            setAlertType("success");
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } else {
            setAlertMessage(errorG);
            setAlertType("error");
        }
    };

    // Function to close alert
    const handleCloseAlert = () => {
        setAlertMessage("");
        setAlertType("");
    };

    if (!user) {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={handleLoginSubmit}>
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <button onClick={handleGoogleLoginPage}><FaGoogle /> Login with Google</button>
                <a href="/register">Don't have an account?</a>

                {alertMessage && <Alert message={alertMessage} type={alertType} onClose={handleCloseAlert} />}
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
