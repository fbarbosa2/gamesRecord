import React from "react";
import { useAuth } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const { user } = useAuth();

    const handleLogout = () => {
        
    };

    if(!user){
        return(
            <div>
                <h1>Login</h1>
                <form>
                    <label>Username</label>
                    <input type="text" name="username" />
                    <label>Password</label>
                    <input type="password" name="password" />
                    <button type="submit">Login</button>
                </form>
                <button><FaGoogle /> Login with Google</button>
                <a href="/register">Don't have an account?</a>
            </div>
        );
    } else {
        return(
            <div>
                <h1>Hi {user.email} ! You are already logged in please log out to change to another account</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            );
    }
};

export default Login;