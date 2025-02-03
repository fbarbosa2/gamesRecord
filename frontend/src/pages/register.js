import {React, useState} from "react";
import UseRegister from "../hooks/registerHooks";

const Register = () => {

    const { registerUser, loading, error } = UseRegister();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await registerUser(email, password, confirmPassword);
        if (result) {
            // Handle successful registration (e.g., redirect to login page)
            //console.log("User registered successfully:", result);
            console.log("user registered");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button type="submit" >Register</button>
            </form>
            <a href="/login">Already have an account?</a>
        </div>
    );
};

export default Register;