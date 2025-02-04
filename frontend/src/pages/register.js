import React, { useState } from "react";
import { useRegister } from "../auth/authHooks";
import Alert from "../components/alert";

const Register = () => {
    const { handleRegister, loading, error } = useRegister();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setAlertMessage("Passwords do not match");
            setAlertType("error");
            return;
        }

        await handleRegister(email, password, confirmPassword);

        if (!error) {
            setAlertMessage("User registered successfully");
            setAlertType("success");
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } else {
            setAlertMessage(error);
            setAlertType("error");
        }
    };

    const handleCloseAlert = () => {
        setAlertMessage("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    required 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>Register</button>
                {loading && <p>Loading...</p>}
                <Alert message={alertMessage} type={alertType} onClose={handleCloseAlert} />
            </form>
            <a href="/login">Already have an account?</a>
        </div>
    );
};

export default Register;
